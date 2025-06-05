import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useTimer } from '../contexts/TimerContext';
import { PHASE_COLORS } from '../constants';

const TimerControls: React.FC = () => {
  const { state, startTimer, pauseTimer, resetTimer } = useTimer();
  const { isRunning, phase } = state;

  const buttonClass = `${PHASE_COLORS[phase]} hover:opacity-90 text-white rounded-full p-3 transition-all duration-300 ease-in-out`;

  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      {isRunning ? (
        <button 
          onClick={pauseTimer} 
          className={buttonClass}
          aria-label="Pause Timer"
        >
          <Pause size={28} />
        </button>
      ) : (
        <button 
          onClick={startTimer} 
          className={buttonClass}
          aria-label="Start Timer"
        >
          <Play size={28} />
        </button>
      )}
      <button 
        onClick={resetTimer} 
        className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full p-3 transition-all duration-300 ease-in-out"
        aria-label="Reset Timer"
      >
        <RotateCcw size={28} />
      </button>
    </div>
  );
};

export default TimerControls;