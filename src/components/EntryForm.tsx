import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/image/logo.svg';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineNodeIndex } from 'react-icons/ai';
import { MdAddToQueue, MdClose } from 'react-icons/md';
import { BiError } from 'react-icons/bi';
import { uuidV4Regex } from '../utils/constants';

const EntryForm: React.FC = () => {
  const [roomId, setRoomId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const generateRoomId = (): void => {
    const newRoomId: string = uuidv4();
    setRoomId(newRoomId);
  };

  const joinRoom = (): void => {
    if (roomId.trim() && name.trim()) {
      if (!uuidV4Regex.test(roomId.trim())) {
        setError('Invalid ID. Please generate a new one.');
        return;
      }
      navigate(`/editor/${roomId}`, { state: { name, roomId } });
    } else if (!roomId.trim() && !name.trim()) {
      setError('Room ID and name are required');
    } else if (!roomId.trim()) {
      setError('Room ID is required');
    } else if (!name.trim()) {
      setError('Name is required');
    }
  };

  const clearError = (): void => {
    setError('');
  };

  return (
    <div className="main-entry-form flex-1">
      <img className="logo" src={logo} alt="logo" />
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="form-buttons flex-default">
        <button className="primary-btn flex-1" onClick={joinRoom}>
          <AiOutlineNodeIndex className="mt-3" />
          Join
        </button>
        <button className="flex-1" onClick={generateRoomId}>
          <MdAddToQueue className="mt-3" />
          New Room ID
        </button>
      </div>
      {error && (
        <p className="error flex-default">
          <BiError className="error-icon" />
          {error}
          <MdClose
            onClick={clearError}
            className="error-icon ml-auto pointer"
          />
        </p>
      )}
    </div>
  );
};

export default EntryForm;
