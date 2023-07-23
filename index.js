const app = require('express')();
// server code
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS", "PUT"]
  }
});

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (username) => {
    // Save the username in the socket instance
    socket.username = username;
  });

  // Handle incoming messages
  socket.on('message', (data) => {
    console.log('Message received:', data);
    io.emit('message', {
      username: socket.username,
      message: data.message,
    }); // Broadcast the message to all connected clients
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


const PORT = 5000;
io.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
