import React from 'react';
import dayIcon from '../assets/image/day.svg';
import nightIcon from '../assets/image/night.svg';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggler: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <img
      className="nav-icon"
      onClick={toggleTheme}
      src={theme === 'day' ? nightIcon : dayIcon}
      alt={theme === 'day' ? 'Switch to Night Mode' : 'Switch to Day Mode'}
    />
  );
};

export default ThemeToggler;
