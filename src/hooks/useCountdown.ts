import { useState, useEffect, useCallback, useRef } from 'react';
import type { CountdownState, UserConfig } from '../types';
import StorageService from '../services/storage';

export function useCountdown() {
  const [config, setConfig] = useState<UserConfig | null>(null);
  const [countdown, setCountdown] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
    totalSeconds: 0,
  });
  const intervalRef = useRef<number | null>(null);

  // 加载配置
  useEffect(() => {
    const savedConfig = StorageService.getConfig();
    if (savedConfig) {
      setConfig(savedConfig);
    }
  }, []);

  // 计算倒计时
  const calculateCountdown = useCallback((targetDate: string): CountdownState => {
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    const diff = target - now;

    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true,
        totalSeconds: 0,
      };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      isExpired: false,
      totalSeconds: Math.floor(diff / 1000),
    };
  }, []);

  // 设置倒计时
  useEffect(() => {
    if (config?.targetDate) {
      // 立即计算一次
      setCountdown(calculateCountdown(config.targetDate));

      // 设置定时器，每秒更新
      intervalRef.current = window.setInterval(() => {
        setCountdown(calculateCountdown(config.targetDate));
      }, 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [config, calculateCountdown]);

  // 设置目标日期
  const setTargetDate = useCallback((date: string, title?: string, theme?: string) => {
    const newConfig: UserConfig = {
      targetDate: date,
      theme: (theme as UserConfig['theme']) || 'graduation',
      title: title || '我的倒计时',
      createdAt: new Date().toISOString(),
    };

    StorageService.saveConfig(newConfig);
    setConfig(newConfig);
  }, []);

  // 更新配置
  const updateConfig = useCallback((updates: Partial<UserConfig>) => {
    if (config) {
      const newConfig = { ...config, ...updates };
      StorageService.saveConfig(newConfig);
      setConfig(newConfig);
    }
  }, [config]);

  // 清除配置
  const clearConfig = useCallback(() => {
    StorageService.clearConfig();
    setConfig(null);
    setCountdown({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: false,
      totalSeconds: 0,
    });
  }, []);

  // 检查是否有配置
  const hasConfig = !!config;

  return {
    config,
    countdown,
    hasConfig,
    setTargetDate,
    updateConfig,
    clearConfig,
  };
}

export default useCountdown;
