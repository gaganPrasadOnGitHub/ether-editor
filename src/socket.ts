import { io } from 'socket.io-client';

export const initSocket = async () => {
  const options = {
    forceNew: true,
    reconnectionAttempt: Infinity,
    timeout: 10000,
    transport: ['websocket'],
  };

  return io('http://localhost:5000', options);
};