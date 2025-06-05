import React from 'react';
import { useTimer } from '../contexts/TimerContext';
import { TimerPhase } from '../types';
import { PHASE_LABELS, PHASE_TEXT_COLORS } from '../constants';

const PhaseSelector: React.FC = () => {
  const { state, setPhase } = useTimer();
  const { phase } = state;

  const phases: TimerPhase[] = ['pomodoro', 'shortBreak', 'longBreak'];

  return (
    <div className="flex justify-center space-x-2 mb-6">
      {phases.map((p) => (
        <button
          key={p}
          onClick={() => setPhase(p)}
          className={`py-2 px-4 rounded-lg transition-all duration-300 ${
            phase === p
              ? `${PHASE_TEXT_COLORS[p]} font-medium`
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {PHASE_LABELS[p]}
        </button>
      ))}
    </div>
  );
};

export default PhaseSelector;