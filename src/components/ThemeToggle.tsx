import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTimer } from '../contexts/TimerContext';
import { THEME_COLORS, DEFAULT_TIMER_SETTINGS } from '../constants';

const ThemeToggle: React.FC = () => {
  const { settings, updateTheme } = useTimer();
  
  // Ensure we have a valid theme
  const currentTheme = settings?.theme && THEME_COLORS[settings.theme] 
    ? settings.theme 
    : DEFAULT_TIMER_SETTINGS.theme;

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    updateTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-4 right-14 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
      aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
    >
      {currentTheme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
    </button>
  );
};

export default ThemeToggle;