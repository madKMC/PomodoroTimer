export type TimerPhase = 'pomodoro' | 'shortBreak' | 'longBreak';

export type Theme = 'light' | 'dark';

export interface TimerSettings {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  longBreakInterval: number;
  theme: Theme;
}