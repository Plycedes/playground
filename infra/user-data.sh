#!/bin/bash
exec > >(tee /var/log/user-data.log | logger -t user-data) 2>&1

# ---- Validate IMAGE_TAG substitution ----
IMAGE_TAG="{{IMAGE_TAG}}"
if [[ "$IMAGE_TAG" == *"{{"* ]] || [[ -z "$IMAGE_TAG" ]]; then
  echo "ERROR: IMAGE_TAG was not substituted correctly: '$IMAGE_TAG'"
  exit 1
fi
echo "IMAGE_TAG resolved to: $IMAGE_TAG"

# ---- Config ----
REGION="ap-south-1"
APP_DIR="/home/ec2-user/app"
SSM_PATH="/playground"

echo "Starting user-data script..."

# ---- Verify Nginx is installed ----
command -v nginx >/dev/null 2>&1 || { echo "ERROR: Nginx is not installed on this AMI. Aborting."; exit 1; }

# ---- Wait for Docker (with timeout) ----
echo "Waiting for Docker..."
DOCKER_RETRIES=0
until docker info >/dev/null 2>&1; do
  DOCKER_RETRIES=$((DOCKER_RETRIES + 1))
  if [ "$DOCKER_RETRIES" -ge 15 ]; then
    echo "ERROR: Docker did not start after $DOCKER_RETRIES attempts. Aborting."
    exit 1
  fi
  echo "Docker not ready yet, retrying ($DOCKER_RETRIES/15)..."
  sleep 2
done
echo "Docker is ready."

# ---- Ensure Nginx running (no install) ----
systemctl enable nginx
systemctl start nginx

# ---- Setup App Directory ----
mkdir -p "$APP_DIR"
cd "$APP_DIR" || exit 1

# ---- Fetch env vars from SSM (with retry) ----
echo "Fetching env from SSM..."
PARAMS=""
for i in {1..5}; do
  PARAMS=$(aws ssm get-parameters-by-path \
    --path "$SSM_PATH" \
    --with-decryption \
    --region "$REGION" \
    --query "Parameters[*].[Name,Value]" \
    --output text 2>/dev/null)
  if [ -n "$PARAMS" ]; then
    echo "SSM fetch succeeded on attempt $i."
    break
  fi
  echo "Retrying SSM fetch ($i/5)..."
  sleep 3
done

if [ -z "$PARAMS" ]; then
  echo "ERROR: Failed to fetch SSM params after 5 attempts."
  exit 1
fi

# ---- Write .env (secure permissions) ----
touch .env
chmod 600 .env

echo "$PARAMS" | while IFS=$'\t' read -r name value; do
  key=$(basename "$name")
  echo "${key}=${value}"
done > .env

# Append IMAGE_TAG so docker-compose can resolve ${IMAGE_TAG}
echo "IMAGE_TAG=${IMAGE_TAG}" >> .env

echo "Generated .env (secrets redacted):"
grep -v -i "secret\|password\|uri\|token\|key" .env || true

# ---- Validate required keys in .env ----
echo "Validating required env vars..."
for required in MONGODB_URI JWT_SECRET REDIS_URL; do
  grep -q "^${required}=" .env || { echo "ERROR: Missing required env var: $required"; exit 1; }
done
echo "All required env vars present."

# ---- Write docker-compose.yml ----
# NOTE: Heredoc is intentionally unquoted (<<EOF, not <<'EOF') so that
# IMAGE_TAG is NOT expanded here — it will be resolved by Docker Compose
# at runtime via the .env file written above.
cat > docker-compose.yml <<'EOF'
services:
  api:
    image: gridsupport/playground-api:${IMAGE_TAG}
    restart: unless-stopped
    init: true
    healthcheck:
      test:
        [
          "CMD",
          "node",
          "-e",
          "require('http').get('http://127.0.0.1:3000/health/live',(r)=>process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1))",
        ]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 40s
    ports:
      - "${HOST_PORT:-5000}:${PORT:-3000}"
    environment:
      NODE_ENV: ${NODE_ENV:-production}
      PORT: ${PORT:-3000}
      MONGODB_URI: ${MONGODB_URI:?Set MONGODB_URI}
      JWT_SECRET: ${JWT_SECRET:?Set JWT_SECRET}
      JWT_EXPIRES_IN: ${JWT_EXPIRES_IN:-1h}
      BCRYPT_ROUNDS: ${BCRYPT_ROUNDS:-12}
      REDIS_URL: ${REDIS_URL:?Set REDIS_URL}
EOF

# ---- Pull image (fail fast on bad tag or auth issues) ----
echo "Pulling image gridsupport/playground-api:${IMAGE_TAG}..."
docker compose pull || { echo "ERROR: Image pull failed. Check IMAGE_TAG and registry credentials."; exit 1; }

# ---- Tear down any previous containers ----
echo "Stopping existing containers..."
docker compose down || echo "Warning: 'compose down' failed — may be a first run, continuing."

# ---- Start app ----
echo "Starting containers..."
docker compose up -d || { echo "ERROR: docker compose up failed."; exit 1; }

# ---- Verify containers came up ----
echo "Waiting for containers to stabilise..."
sleep 10
docker compose ps

RUNNING=$(docker compose ps --services --filter "status=running" 2>/dev/null)
if echo "$RUNNING" | grep -q "api"; then
  echo "Container 'api' is running."
else
  echo "ERROR: Container 'api' did not start correctly."
  docker compose logs --tail=50
  exit 1
fi

# ---- Ensure Nginx config exists (only if not baked into AMI) ----
if [ ! -f /etc/nginx/conf.d/app.conf ]; then
  echo "Writing Nginx config..."
  cat > /etc/nginx/conf.d/app.conf <<'NGINX'
server {
    listen 80;
    server_name _;
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX
fi

nginx -t || { echo "ERROR: Nginx config test failed."; exit 1; }
systemctl reload nginx

echo "============================================"
echo "User-data completed successfully."
echo "IMAGE_TAG : $IMAGE_TAG"
echo "APP_DIR   : $APP_DIR"
echo "REGION    : $REGION"
echo "============================================"