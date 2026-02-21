import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { UserConfig } from './types';
import { useCountdown } from './hooks/useCountdown';
import { GuidePage } from './components/GuidePage/GuidePage';
import { DiaryHome } from './components/DiaryHome/DiaryHome';
import './styles/variables.css';
import './styles/global.css';

function App() {
  const {
    config,
    countdown,
    hasConfig,
    setTargetDate,
    clearConfig,
  } = useCountdown();

  const [showGuide, setShowGuide] = useState(!hasConfig);

  const handleGuideComplete = (newConfig: Partial<UserConfig>) => {
    if (newConfig.targetDate) {
      setTargetDate(
        newConfig.targetDate,
        newConfig.title,
        newConfig.theme
      );
      setShowGuide(false);
    }
  };

  const handleEdit = () => {
    setShowGuide(true);
  };

  const handleReset = () => {
    if (confirm('确定要重置所有设置吗？这将清除你的倒计时配置。')) {
      clearConfig();
      setShowGuide(true);
    }
  };

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {showGuide ? (
          <GuidePage
            key="guide"
            onComplete={handleGuideComplete}
          />
        ) : config ? (
          <DiaryHome
            key="home"
            config={config}
            countdown={countdown}
            onEdit={handleEdit}
            onReset={handleReset}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default App;
