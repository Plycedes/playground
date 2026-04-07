import { createInterface, Interface } from "readline";
import io, { Socket } from "socket.io-client";

interface LoginResponse {
    user: {
        id: string;
        email: string;
        name: string;
    };
    token: string;
}

interface Chat {
    _id: string;
    name?: string;
    creatorId: string;
    members: string[];
    createdAt: Date;
}

interface Message {
    id: string;
    chatId: string;
    senderId: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

const rl: Interface = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const BASE_URL = "http://localhost:5000/api/v1";
const SOCKET = "http://localhost:5000";

function ask(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

async function login(): Promise<string> {
    const email = await ask("Enter email (username): ");
    const password = await ask("Enter password: ");

    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error(`Login failed: ${response.statusText}`);
        }

        const data: ApiResponse<LoginResponse> =
            (await response.json()) as ApiResponse<LoginResponse>;
        console.log("Login successful!");
        return data.data.token;
    } catch (error) {
        console.error("Login error:", (error as Error).message);
        process.exit(1);
    }
}

async function getChats(token: string): Promise<Chat[]> {
    try {
        const response = await fetch(`${BASE_URL}/chats`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch chats: ${response.statusText}`);
        }

        const chats: ApiResponse<Chat[]> = (await response.json()) as ApiResponse<Chat[]>;
        return chats.data;
    } catch (error) {
        console.error("Error fetching chats:", (error as Error).message);
        process.exit(1);
    }
}

async function selectChat(chats: Chat[]): Promise<Chat> {
    if (chats.length === 0) {
        console.log("No chats available.");
        process.exit(0);
    }

    console.log("Available chats:");
    chats.forEach((chat, index) => {
        console.log(`${index + 1}. ${chat.name || chat._id}`);
    });

    const choice = await ask("Select a chat (number): ");
    const index = parseInt(choice, 10) - 1;

    if (index < 0 || index >= chats.length) {
        console.log("Invalid choice.");
        return selectChat(chats);
    }

    return chats[index];
}

function startChatClient(token: string, chat: Chat): void {
    const socket = io(SOCKET, {
        auth: {
            token,
        },
    });

    socket.on("connect", () => {
        console.log("Connected to server");
        socket.emit("joinRoom", chat._id);
    });

    socket.on("roomJoined", (data: { chatId: string }) => {
        console.log(`Joined chat: ${data.chatId}`);
        console.log('Type your message and press Enter. Type "exit" to quit.');
        promptMessage();
    });

    socket.on("message", (message: Message) => {
        console.log(`\n[${message.senderId}]: ${message.text}`);
        promptMessage();
    });

    socket.on("error", (error: { message: string }) => {
        console.error("Socket error:", error.message);
    });

    socket.on("disconnect", () => {
        console.log("Disconnected from server");
        rl.close();
    });

    function promptMessage(): void {
        rl.question("> ", (input: string) => {
            if (input.toLowerCase() === "exit") {
                socket.disconnect();
                return;
            }
            socket.emit("chatMessage", { chatId: chat._id, text: input });
        });
    }
}

async function main(): Promise<void> {
    console.log("Chat Client");
    const token = await login();
    const chats = await getChats(token);
    const selectedChat = await selectChat(chats);
    startChatClient(token, selectedChat);
}

main();
