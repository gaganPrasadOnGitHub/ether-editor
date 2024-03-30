import React, { useRef, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import useOutsideClick from '../utils/useOutsideClick';
import angleUp from '../assets/image/angle-up.svg';
import { TeamMember } from '../utils/types';

interface EditorNavProps {
  teamMembers: TeamMember[];
}

const EditorNav: React.FC<EditorNavProps> = ({ teamMembers }) => {
  const [share, setShare] = useState<boolean>(false);
  const [showTeam, setShowTeam] = useState<boolean>(false);

  const teamRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  const state = location.state as { name: string; roomId: string } | null;

  useOutsideClick(teamRef, () => setShowTeam(false));

  const toggleTeamList = () => {
    setShowTeam(!showTeam);
  };

  const copyRoomIdToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(state?.roomId || '');
      setShare(true);
      setTimeout(() => setShare(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="relative flex-default justify-space-between">
      <div ref={teamRef}>
        <p className="editor-nav-item pointer" onClick={toggleTeamList}>
          Members{' '}
          <img
            className={`${showTeam ? 'rotate-180 ' : ''}arrow`}
            src={angleUp}
            alt="members"
          />
        </p>
        {showTeam && (
          <div className="team-members">
            {teamMembers.map((member) => (
              <div key={member.socketId} className="member-card">
                <p className="profile">{member.name[0].toUpperCase()}</p>
                <p>{member.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="button-container flex-default">
        <p className="editor-nav-item pointer" onClick={copyRoomIdToClipboard}>
          Copy ID
        </p>
        {share && (
          <small className="notification copied-notification">Copied</small>
        )}
        <Link className="link" to="/">
          <p className="editor-nav-item">Leave</p>
        </Link>
      </div>
    </div>
  );
};

export default EditorNav;
