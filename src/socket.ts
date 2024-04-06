import { io } from 'socket.io-client';

export const initSocket = async () => {
  const options = {
    forceNew: true,
    reconnectionAttempt: Infinity,
    timeout: 10000,
    transport: ['websocket'],
  };

  const hostUrl = 'https://ether-editor-q2mv.onrender.com';
  return io(hostUrl, options);
};
