'use client'

import React, { useState, useEffect } from 'react';

const LiveDateTime: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="flex flex-col items-start mt-2">
      <div className="flex items-center gap-2">
        <span className="text-xl font-mono font-bold text-white tracking-wider" style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
          {formatTime(time)}
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
      </div>
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
        {formatDate(time)}
      </div>
    </div>
  );
};

export default LiveDateTime;
