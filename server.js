const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const cors = require('cors');

const userSocketMap = {};
const app = express();
const httpServer = http.createServer(app);
app.use(cors());
app.use(express.static('build'));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const io = new Server(httpServer, {
  cors: {
    origin: 'https://ether-editor-q2mv.onrender.com',
    credentials: true,
  },
});

const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        name: userSocketMap[socketId],
      };
    }
  );
};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join', ({ roomId, name }) => {
    userSocketMap[socket.id] = name;
    socket.join(roomId);

    const clients = getAllConnectedClients(roomId);

    io.in(roomId).emit('joined', {
      clients,
      name,
    });

    socket.to(roomId).emit('request_current_code', { requester: socket.id });
  });

  socket.on('code_change', ({ roomId, code }) => {
    socket.to(roomId).emit('code_change', {
      roomId,
      code,
    });
  });

  socket.on('send_current_code', ({ code, roomId, requester }) => {
    io.to(requester).emit('code_change', { roomId, code });
  });

  socket.on('disconnecting', () => {
    const rooms = Array.from(socket.rooms).filter((r) => r !== socket.id);
    rooms.forEach((roomId) => {
      socket.to(roomId).emit('disconnected', {
        socketId: socket.id,
        name: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
