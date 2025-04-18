import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./db/connectDb.js";
import userAuthRoutes from "./routes/userAuth.routes.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
import http from "http";
import { Server } from "socket.io";
const server = http.createServer(app);

const io = new Server(server);
const port = process.env.PORT || 3000;

//connecting databse
dbConnect();
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//All routes
app.use("/api/auth", userAuthRoutes);
app.use("/api/user", userRoutes);

//Socket.io
const rooms = {};
io.on("connection", (socket) => {
  console.log("a user connected with socket id:", socket.id);

  socket.on("connected", (roomId, userFullName, roomName) => {
    socket.join(roomId);
    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }
    const userExists = rooms[roomId].some(
      (user) => user.socketId === socket.id
    );

    if (!userExists) {
      rooms[roomId].push({ socketId: socket.id, userFullName, roomName });
    }

    socket.emit(
      "welcome",
      `Welcome to the room ${roomName} ${userFullName}`,
      rooms[roomId]
    );
  });

  socket.on("disconnecting-user-accidentaly", (roomId) => {
    rooms[roomId] = rooms[roomId].filter((user) => user.socketId !== socket.id);
    if (rooms[roomId].length === 0) {
      delete rooms[roomId];
    } else {
      socket
        .to(roomId)
        .emit(
          "user-disconnected",
          `${socket.id} has left the room`,
          rooms[roomId]
        );
    }

    socket.leave(roomId)
  });

  socket.on("disconnect-user", (roomId) => {
    rooms[roomId] = rooms[roomId].filter((user) => user.socketId !== socket.id)

    if (rooms[roomId].length === 0) {
      delete rooms[roomId]
    }
    socket.leave(roomId)
    socket.disconnect()
    console.log(socket.id, "disconnected")
    socket
      .to(roomId)
      .emit(
        "user-disconnected",
        `${socket.id} has left the room`,
        rooms[roomId]
      )
  })

  socket.on("send-message", (message, roomId) => {
    socket.to(roomId).emit("receive-message", message)
  })

  socket.on("send-updated-text",(content,roomId)=>{
    
    socket.to(roomId).emit("receive-updated-text",content)
  })
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
