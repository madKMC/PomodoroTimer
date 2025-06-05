import { TimerSettings, Theme } from '../types';

export const DEFAULT_TIMER_SETTINGS: TimerSettings = {
  pomodoro: 25 * 60, // 25 minutes in seconds
  shortBreak: 5 * 60, // 5 minutes in seconds
  longBreak: 30 * 60, // 30 minutes in seconds
  autoStartBreaks: true,
  autoStartPomodoros: true,
  longBreakInterval: 4,
  theme: 'light',
};

export const STORAGE_KEY = 'pomodoroSettings';

export const TIMER_PHASES = {
  POMODORO: 'pomodoro',
  SHORT_BREAK: 'shortBreak',
  LONG_BREAK: 'longBreak',
} as const;

export const PHASE_LABELS = {
  pomodoro: 'Focus',
  shortBreak: 'Short Break',
  longBreak: 'Long Break',
};

export const THEME_COLORS = {
  light: {
    background: 'bg-gray-100',
    card: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-700',
    timer: 'text-gray-900',
    pomodoro: 'bg-red-500',
    shortBreak: 'bg-blue-400',
    longBreak: 'bg-blue-600',
  },
  dark: {
    background: 'bg-gray-900',
    card: 'bg-gray-800',
    text: 'text-white',
    textSecondary: 'text-white',
    timer: 'text-white',
    pomodoro: 'bg-red-600',
    shortBreak: 'bg-blue-500',
    longBreak: 'bg-blue-700',
  }
};

export const PHASE_COLORS = {
  pomodoro: 'bg-red-500 dark:bg-red-600',
  shortBreak: 'bg-blue-400 dark:bg-blue-500',
  longBreak: 'bg-blue-600 dark:bg-blue-700'
};

export const PHASE_TEXT_COLORS = {
  pomodoro: 'text-red-500 dark:text-red-400',
  shortBreak: 'text-blue-400 dark:text-blue-300',
  longBreak: 'text-blue-600 dark:text-blue-500'
};

export const NOTIFICATION_MESSAGES = {
  pomodoro: 'Time to focus!',
  shortBreak: 'Take a short break!',
  longBreak: 'Take a long break!',
};