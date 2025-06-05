import React from 'react';
import { useTimer } from '../contexts/TimerContext';

const SessionCounter: React.FC = () => {
  const { state, settings } = useTimer();
  const { sessionsCompleted } = state;
  const { longBreakInterval } = settings;

  // Create an array representing the session indicators
  const sessionIndicators = Array.from({ length: longBreakInterval }, (_, index) => {
    return index < (sessionsCompleted % longBreakInterval);
  });

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="text-sm text-gray-600 mb-2">
        Sessions: {sessionsCompleted}
      </div>
      <div className="flex space-x-1">
        {sessionIndicators.map((completed, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              completed ? 'bg-red-500' : 'bg-gray-300'
            }`}
            aria-label={completed ? 'Completed session' : 'Incomplete session'}
          />
        ))}
      </div>
    </div>
  );
};

export default SessionCounter;