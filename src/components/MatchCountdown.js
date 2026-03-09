import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Radio, Bell, BellRing } from 'lucide-react';

const MatchCountdown = () => {
  const [isReminderSet, setIsReminderSet] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Target date: March 19, 2026 (Next match vs Aurora as per HLTV)
  const targetDate = new Date("2026-03-19T18:00:00").getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const handleReminderToggle = () => {
    setIsReminderSet(!isReminderSet);
  };

  return (
    <div className="countdown-bar">
      <div className="countdown-info">
        <span className="live-tag"><Radio size={14} /> UPCOMING MATCH</span>
        <span className="match-vs">FAZE vs AURORA</span>
        <span className="match-event">ESL Pro League S23</span>
      </div>
      
      <div className="timer-container">
        <div className="timer-unit">
          <span className="timer-val">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="timer-label">D</span>
        </div>
        <span className="timer-sep">:</span>
        <div className="timer-unit">
          <span className="timer-val">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="timer-label">H</span>
        </div>
        <span className="timer-sep">:</span>
        <div className="timer-unit">
          <span className="timer-val">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="timer-label">M</span>
        </div>
        <span className="timer-sep">:</span>
        <div className="timer-unit">
          <span className="timer-val">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="timer-label">S</span>
        </div>
      </div>

      <motion.button 
        className={`watch-btn ${isReminderSet ? 'reminder-set' : ''}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleReminderToggle}
      >
        <span key={isReminderSet ? 'set' : 'unset'} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isReminderSet ? <BellRing size={16} /> : <Bell size={16} />}
          <span>{isReminderSet ? 'Reminder Set' : 'Set Reminder'}</span>
        </span>
      </motion.button>
    </div>
  );
};

export default MatchCountdown;
