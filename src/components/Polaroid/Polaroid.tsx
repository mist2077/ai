import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Polaroid.css';

interface PolaroidProps {
  image?: string;
  emoji?: string;
  caption?: string;
  backContent?: string;
  onFlip?: () => void;
}

export const Polaroid: React.FC<PolaroidProps> = ({
  image,
  emoji = '📷',
  caption = '校园一角',
  backContent = '珍惜每一天，记录每一刻美好 📸',
  onFlip,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    onFlip?.();
  };

  return (
    <motion.div
      className="polaroid-wrapper"
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`polaroid-flipper ${isFlipped ? 'flipped' : ''}`}>
        {/* 正面 */}
        <div className="polaroid-front">
          <div className="polaroid-tape"></div>
          <div className="polaroid-image-container">
            {image ? (
              <img src={image} alt={caption} className="polaroid-image" />
            ) : (
              <div className="polaroid-emoji">{emoji}</div>
            )}
          </div>
          <div className="polaroid-caption">{caption}</div>
          <div className="polaroid-hint">点击翻转查看背面 ✨</div>
        </div>

        {/* 背面 */}
        <div className="polaroid-back">
          <div className="polaroid-tape back"></div>
          <div className="polaroid-note">
            <div className="note-header">
              <span className="note-date">
                {new Date().toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="note-content">{backContent}</div>
            <div className="note-signature">
              —— 来自过去的你 💌
            </div>
          </div>
          <div className="polaroid-hint back">点击翻回正面 📸</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Polaroid;
