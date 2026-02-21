import type { UserConfig } from '../types';

const STORAGE_KEY = 'campus-time-config';

export class StorageService {
  // 获取配置
  static getConfig(): UserConfig | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return null;
      return JSON.parse(data) as UserConfig;
    } catch (error) {
      console.error('Failed to get config from localStorage:', error);
      return null;
    }
  }

  // 保存配置
  static saveConfig(config: UserConfig): boolean {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      return true;
    } catch (error) {
      console.error('Failed to save config to localStorage:', error);
      // 如果LocalStorage满了，可以考虑降级到IndexedDB
      return false;
    }
  }

  // 清除配置
  static clearConfig(): boolean {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Failed to clear config:', error);
      return false;
    }
  }
}

export default StorageService;
