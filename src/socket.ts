import { io } from 'socket.io-client';

export const initSocket = async () => {
  const options = {
    forceNew: true,
    reconnectionAttempt: Infinity,
    timeout: 10000,
    transport: ['websocket'],
  };

  const hostUrl = process.env.HOST_URL || 'http://localhost:5000';
  return io(hostUrl, options);
};
