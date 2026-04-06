# TS MongoDB Server

A production-grade TypeScript server with MongoDB using a class-based three-layer architecture.

## Features

- **Three-Layer Architecture**: Controllers (Presentation), Services (Business Logic), Repositories (Data Access)
- **Static Methods**: All methods in the layers are static members of their classes
- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Security**: Helmet, CORS, rate limiting
- **Validation**: Joi for input validation
- **Logging**: Winston for logging
- **Error Handling**: Centralized error handling middleware

## Project Structure

```
├── src/
│   ├── controllers/     # Presentation layer
│   ├── services/        # Business logic layer
│   ├── repositories/    # Data access layer
│   ├── models/          # Mongoose models
│   ├── middlewares/     # Express middlewares
│   ├── routes/          # API routes
│   └── index.ts         # Server entry point
├── config/              # Configuration files
├── constants/           # Constants and messages
├── utilities/           # Utility functions
├── .env                 # Environment variables
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env` (copy from `.env.example`)
4. Build the project: `npm run build`
5. Start the server: `npm start`

## Environment Variables

- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT
- `JWT_EXPIRES_IN`: JWT expiration time (default: 1h)
- `BCRYPT_ROUNDS`: Bcrypt salt rounds (default: 12)

## API Endpoints

### User Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (requires authentication)

### Posts

- `POST /api/posts` - Create a new post (requires authentication)
- `GET /api/posts` - Get all posts for the authenticated user
- `GET /api/posts/:id` - Get a specific post by ID (requires authentication, owner only)
- `PUT /api/posts/:id` - Update a post by ID (requires authentication, owner only)
- `DELETE /api/posts/:id` - Delete a post by ID (requires authentication, owner only)

### Chat

- `POST /api/chats/:roomId/messages` - Send a message in a room chat (requires authentication)
- `GET /api/chats/:roomId/messages` - Read messages from a room chat (requires authentication)

WebSocket events:

- `joinRoom` - Join a room by roomId
- `leaveRoom` - Leave a room by roomId
- `chatMessage` - Send a room message with payload `{ roomId, text }`
- `message` - Receive room messages in real time

## Development

- `npm run dev` - Start development server with ts-node
- `npm run build` - Compile TypeScript
- `npm test` - Run tests

## Health Check

- `GET /health` - Server health check
