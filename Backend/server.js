require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const setupSocketHandlers = require("./SocketHandlers");
const ChannelRoutes = require("./routes/ChannelRoutes");
const UserRoutes = require("./routes/UserRoutes");
const MessageRoutes = require("./routes/MessageRoutes");

// middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }))
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})




// routes
app.use("/api/channels", ChannelRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/messages", MessageRoutes);

// listening
const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

/***************************************************/

// // socket.io
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "http://localhost",
//   },
// });

// // pass io to the socket handlers
// setupSocketHandlers(io);
