import CodeEditor from '../components/CodeEditor';
import EditorNav from '../components/EditorNav';
import { initSocket } from '../socket';
import { Socket } from 'socket.io-client';
import { ACTIONS } from '../utils/constants';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { TeamMember } from '../utils/types';

const EditorPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [notification, setNotification] = useState<string>('');
  const socketRef = useRef<Socket | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as { name: string; roomId: string } | null;

  useEffect(() => {
    if (!state?.roomId || !state?.name) {
      navigate('/');
      return;
    }

    const init = async () => {
      const socket = await initSocket();
      socketRef.current = socket;

      socket.on('connect_error', (err: Error) => {
        console.log('Connection Error', err.message);
        navigate('/');
      });

      socket.emit(ACTIONS.JOIN, { roomId: state.roomId, name: state.name });

      socket.on(ACTIONS.JOINED, ({ clients, name }) => {
        const message = `${name} joined the room`;
        showNotification(message);
        setTeamMembers(clients);
      });

      socket.on(ACTIONS.DISCONNECTED, ({ socketId, name }) => {
        const message = `${name} disconnected from the room`;
        showNotification(message);
        setTeamMembers((prev) =>
          prev.filter((item) => item.socketId !== socketId)
        );
      });
    };

    init();

    return () => {
      socketRef.current?.off(ACTIONS.JOINED);
      socketRef.current?.off(ACTIONS.DISCONNECTED);
      socketRef.current?.disconnect();
    };
  }, [state?.roomId, state?.name, navigate]);

  if (!state || !state.name || !state.roomId) {
    return <Navigate to="/" />;
  }

  const showNotification = async (message: string) => {
    try {
      setNotification(message);
      setTimeout(() => setNotification(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="container">
      <EditorNav teamMembers={teamMembers} />
      {notification && <small className="notification">{notification}</small>}

      <CodeEditor socketRef={socketRef.current} roomId={state.roomId} />
    </div>
  );
};

export default EditorPage;
