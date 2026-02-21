// 用户配置
export interface UserConfig {
  targetDate: string;      // ISO 8601 格式日期
  theme: 'graduation' | 'summer' | 'winter' | 'custom';
  title: string;           // 自定义标题，如"我的毕业季"
  createdAt: string;
  mood?: string;           // 心情文字
}

// 倒计时状态
export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  totalSeconds: number;
}

// 主题配置
export interface ThemeConfig {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  emoji: string;
}
