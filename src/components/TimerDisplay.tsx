import React from 'react';
import { useTimer } from '../contexts/TimerContext';
import CircularProgress from './CircularProgress';
import { PHASE_LABELS, PHASE_TEXT_COLORS, THEME_COLORS, DEFAULT_TIMER_SETTINGS } from '../constants';

const TimerDisplay: React.FC = () => {
  const { state, settings } = useTimer();
  const { phase, timeRemaining, isRunning } = state;

  // Ensure we have a valid theme
  const theme = Object.keys(THEME_COLORS).includes(settings?.theme) 
    ? settings.theme 
    : DEFAULT_TIMER_SETTINGS.theme;

  // Calculate percentage of time remaining
  const totalTime = settings[phase];
  const percentage = 100 - (timeRemaining / totalTime) * 100;

  // Format time remaining as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <CircularProgress percentage={percentage} phase={phase}>
        <div className="flex flex-col items-center">
          <h2 className={`text-lg font-medium mb-2 ${PHASE_TEXT_COLORS[phase]}`}>
            {PHASE_LABELS[phase]}
          </h2>
          <div 
            className={`text-6xl font-bold transition-colors duration-300 ${
              isRunning ? THEME_COLORS[theme].timer : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {formatTime(timeRemaining)}
          </div>
        </div>
      </CircularProgress>
    </div>
  );
};

export default TimerDisplay