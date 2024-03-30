import { io } from 'socket.io-client';

export const initSocket = async () => {
  const options = {
    forceNew: true,
    reconnectionAttempt: Infinity,
    timeout: 10000,
    transport: ['websocket'],
  };

  const hostUrl = 'https://ether-editor-0e22562dd46d.herokuapp.com';
  return io(hostUrl, options);
};
