import "dotenv/config";
import http from "http";
import express from "express";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
const app = express();
const server = http.createServer(app);
const onlineUsers = new Map<string, string>();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
import helemt from "helmet";
import cors from "cors";
import connectdb from "./Connect/Conn";
import userRouter from "./Router/userrouter";
import ConversationModel from "./Modules/Conversation";
import MessageModel from "./Modules/Message";
app.use(helemt());
app.use(cors());
app.use(express.json());
connectdb();

io.use((socket, next) => {
  // 1. Token lo
  const token = socket.handshake.auth.token;
  // 2. Token hai?
  try {
    if (!token) {
      return next(new Error("Authentication token missing"));
    }
    // 3. JWT Verify
    jwt.verify(
      token,
      process.env.JWT_SECRET_TOKEN as string,
      (err: any, decode: any) => {
        // 4. socket.user me store karo
        if (err) {
          return next(new Error("Invalid Token"));
        }
        socket.data.user = decode;
        next();
      },
    );
  } catch (error: any) {
    return next(new Error(error.message));
  }
});

io.on("connection", (socket) => {
  const user = socket.data.user;
  const userId = user.id;
  onlineUsers.set(userId, socket.id);
  console.log("User Connected:", socket.id);
  console.log("User:", socket.data.user);

  socket.on("joinConversation", (conversationId: string) => {
    // Join Room
    socket.join(conversationId);
    socket.emit("joinedConversation", {
      conversationId,
    });
  });

  socket.on("leaveConversation", (conversationId: string) => {
    socket.leave(conversationId);
    socket.emit("leftConversation", {
      conversationId,
    });
  });

  socket.on("sendMessage", async (data) => {
    const senderId = socket.data.user.id;
    const { conversationId, content } = data;

    const conversation = await ConversationModel.findById(conversationId);

    if (!conversation) {
      return;
    }
    const isMember = conversation.members.some(
      (member: any) => member.toString() === senderId,
    );

    if (!isMember) {
      return;
    }
    const message = new MessageModel({
      sender: senderId,
      conversation: conversationId,
      content,
    });
    await message.save();
    // Next
    const populatedMessage = await MessageModel.findById(message._id).populate(
      "sender",
      "name email profileImage",
    );

    io.to(conversationId).emit("newMessage", populatedMessage);
  });

  socket.on("disconnect", () => {
    onlineUsers.delete(userId);
    console.log("User Disconnected:", socket.id);
  });
});
app.use("/user", userRouter);
// Error Handler
app.use((err: any, req: any, res: any, next: any) => {
  res.status(500).json({
    success: false,
    message: err.message,
  });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
