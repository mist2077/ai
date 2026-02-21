import React from 'react';
import { motion } from 'framer-motion';
import type { CountdownState } from '../../types';
import './CountdownCard.css';

interface CountdownCardProps {
  countdown: CountdownState;
  title: string;
}

export const CountdownCard: React.FC<CountdownCardProps> = ({
  countdown,
  title,
}) => {
  const { days, hours, minutes, seconds, isExpired } = countdown;

  // 补零函数
  const pad = (num: number) => String(num).padStart(2, '0');

  if (isExpired) {
    return (
      <motion.div
        className="countdown-card expired"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="expired-content">
          <motion.div
            className="expired-icon"
            animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            🎉
          </motion.div>
          <h3 className="expired-title">{title}</h3>
          <p className="expired-message">这一天终于到来了！</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="countdown-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="countdown-header">
        <motion.div
          className="countdown-icon"
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          📅
        </motion.div>
        <h3 className="countdown-title">{title}</h3>
      </div>

      <div className="countdown-display">
        <div className="countdown-main">
          <motion.div
            key={days}
            className="days-number"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {days}
          </motion.div>
          <div className="days-label">天</div>
        </div>

        <div className="countdown-details">
          <div className="time-unit">
            <motion.span
              key={hours}
              className="time-value"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {pad(hours)}
            </motion.span>
            <span className="time-label">时</span>
          </div>

          <div className="time-separator">:</div>

          <div className="time-unit">
            <motion.span
              key={minutes}
              className="time-value"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {pad(minutes)}
            </motion.span>
            <span className="time-label">分</span>
          </div>

          <div className="time-separator">:</div>

          <div className="time-unit">
            <motion.span
              key={seconds}
              className="time-value"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {pad(seconds)}
            </motion.span>
            <span className="time-label">秒</span>
          </div>
        </div>
      </div>

      <motion.div
        className="countdown-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="pulse-indicator">
          <span className="pulse-dot" />
          <span className="pulse-text">实时跳动中</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CountdownCard;
