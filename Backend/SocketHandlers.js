// an object that will hold all active chatrooms
const chatrooms = new Map();

function setupSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("join room", (room) => {
      if (!chatrooms.has(room)) {
        // Create a new room if it doesn't exist
        chatrooms.set(room, new Set());
      }
      // Add the user's socket to the room
      chatrooms.get(room).add(socket.id);
      socket.join(room);
      console.log(`Socket ${socket.id} joined room ${room}`);
    });

    socket.on("leave room", (room) => {
      if (chatrooms.has(room)) {
        // Remove the user's socket from the room
        chatrooms.get(room).delete(socket.id);
        if (chatrooms.get(room).size === 0) {
          // If the room is empty, you can choose to delete it
          chatrooms.delete(room);
        }
      }
      socket.leave(room);
      console.log(`Socket ${socket.id} left room ${room}`);
    });

    socket.on("message", ({ room, message }) => {
      // Emit the message to all sockets in the room
      io.to(room).emit("message", message);
    });

    socket.on("disconnect", () => {
      // Remove the socket from all rooms it was part of
      chatrooms.forEach((sockets, room) => {
        sockets.delete(socket.id);
        if (sockets.size === 0) {
          // Optionally, delete the room if it's now empty
          chatrooms.delete(room);
        }
      });
      console.log(`Socket ${socket.id} disconnected`);
    });
  });
}

module.exports = setupSocketHandlers;
