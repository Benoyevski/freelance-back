require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const http = require("http");
app.use(cors());
app.use(express.json());
const { Server } = require("socket.io");
app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.resolve(__dirname, "public")));
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
let onlineUsers = [];

const addNewUser = (id, socketId) => {
   !onlineUsers.some((user) => user === id) &&
    onlineUsers.push({ id, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.id === username);
};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`,);
  socket.on("newUser", (id) => {
    
    addNewUser(id, socket.id);
    console.log(onlineUsers)
  });

  socket.on("notif", ({ senderId, receiverId,order }) => {
    const receiver = getUser(receiverId);
   console.log(order)
    io.to(receiver.socketId).emit("getNotif", {
      senderId,
      receiverId,
      order
    });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});
console.log(onlineUsers)

app.use(require("./routes/user.route"));
app.use(require("./routes/category.route"));
app.use(require("./routes/order.route"));
app.use(require("./routes/category.route"));
mongoose
  .connect(process.env.MONGO_SERVER)
  .then(() => console.log("mongoose connect"))
  .catch(() => console.log("warning"));

server.listen(process.env.SERVER_PORT, () => {
  console.log(`Server: ${process.env.SERVER_PORT} had been started`);
});

