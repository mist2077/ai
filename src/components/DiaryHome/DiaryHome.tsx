import React from 'react';
import { motion } from 'framer-motion';
import type { CountdownState, UserConfig } from '../../types';
import { CountdownCard } from '../CountdownCard/CountdownCard';
import { Polaroid } from '../Polaroid/Polaroid';
import './DiaryHome.css';

interface DiaryHomeProps {
  config: UserConfig;
  countdown: CountdownState;
  onEdit: () => void;
  onReset: () => void;
}

const themeEmojis: Record<string, string> = {
  graduation: '🎓',
  summer: '☀️',
  winter: '❄️',
  custom: '✨',
};

const themeNames: Record<string, string> = {
  graduation: '毕业',
  summer: '暑假',
  winter: '寒假',
  custom: '自定义',
};

export const DiaryHome: React.FC<DiaryHomeProps> = ({
  config,
  countdown,
  onEdit,
  onReset,
}) => {
  const emoji = themeEmojis[config.theme] || '✨';
  const themeName = themeNames[config.theme] || '自定义';

  const getBackContent = () => {
    const days = countdown.days;
    if (days > 30) {
      return `还有 ${days} 天的期待，每一天都值得被认真对待。愿你在这段时光里，既能仰望星空，也能脚踏实地。✨`;
    } else if (days > 7) {
      return `仅剩 ${days} 天！最后的冲刺阶段，不要放弃，你已经走了这么远。加油！💪`;
    } else if (days > 0) {
      return `倒计时 ${days} 天！激动人心的时刻即将到来，做好准备迎接它吧！🎉`;
    } else {
      return '今天就是这一天！所有的期待都将成真，去拥抱属于你的时刻吧！🌟';
    }
  };

  return (
    <motion.div
      className="diary-home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 手账本封面 */}
      <motion.div
        className="diary-cover"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* 手账标题 */}
        <div className="diary-header">
          <motion.div
            className="diary-icon"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 5 }}
          >
            ✏️
          </motion.div>
          <h1 className="diary-title">校园时光手账</h1>
          <div className="diary-subtitle">{emoji} {themeName}倒计时</div>
        </div>

        {/* 主要内容区域 */}
        <div className="diary-content">
          {/* 左侧：拍立得 */}
          <motion.div
            className="diary-left"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Polaroid
              emoji={emoji}
              caption={config.title}
              backContent={getBackContent()}
            />

            {/* 心情便签 */}
            {config.mood && (
              <motion.div
                className="mood-note"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="mood-tape"></div>
                <div className="mood-header">
                  <span className="mood-icon">📝</span>
                  <span className="mood-title">今日心情</span>
                </div>
                <div className="mood-content">{config.mood}</div>
                <div className="mood-date">
                  {new Date(config.createdAt).toLocaleDateString('zh-CN', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* 右侧：倒计时卡片 */}
          <motion.div
            className="diary-right"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <CountdownCard countdown={countdown} title={config.title} />

            {/* 操作按钮 */}
            <motion.div
              className="action-buttons"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <button className="action-btn edit" onClick={onEdit}>
                <span className="btn-icon">✏️</span>
                <span className="btn-text">编辑</span>
              </button>
              <button className="action-btn reset" onClick={onReset}>
                <span className="btn-icon">🔄</span>
                <span className="btn-text">重置</span>
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* 底部提示 */}
        <motion.div
          className="diary-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="footer-hint">
            <span className="hint-icon">💡</span>
            <span className="hint-text">点击拍立得可以翻转查看背面留言哦~</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DiaryHome;
