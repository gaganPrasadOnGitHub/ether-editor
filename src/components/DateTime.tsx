import React, { useEffect, useState } from 'react';

const DateTime: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="date-time">
      <span className="date-part">
        {currentDateTime.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'long',
          day: 'numeric',
        })}
      </span>
      <span className="time-part">
        {' | '}
        {currentDateTime.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })}
      </span>
    </div>
  );
};

export default DateTime;
