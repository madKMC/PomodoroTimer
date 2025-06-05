import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { TimerState, TimerSettings, TimerPhase } from '../types';
import { DEFAULT_TIMER_SETTINGS, STORAGE_KEY, TIMER_PHASES } from '../constants';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNotification } from '../hooks/useNotification';
import { useSound } from '../hooks/useSound';

type TimerAction =
  | { type: 'START_TIMER' }
  | { type: 'PAUSE_TIMER' }
  | { type: 'RESET_TIMER' }
  | { type: 'SET_PHASE'; payload: TimerPhase }
  | { type: 'TICK' }
  | { type: 'COMPLETE_SESSION' }
  | { type: 'UPDATE_TIME'; payload: number }
  | { type: 'UPDATE_SETTINGS'; payload: Omit<TimerSettings, 'theme'> };

interface TimerContextType {
  state: TimerState;
  settings: TimerSettings;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  setPhase: (phase: TimerPhase) => void;
  updateSettings: (settings: TimerSettings) => void;
  updateTheme: (theme: 'light' | 'dark') => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useLocalStorage<TimerSettings>(STORAGE_KEY, DEFAULT_TIMER_SETTINGS);
  const [state, dispatch] = useReducer(timerReducer, {
    phase: 'pomodoro',
    timeRemaining: settings.pomodoro,
    isRunning: false,
    sessionsCompleted: 0,
  });

  const { showNotification, requestPermission } = useNotification();
  const { playAlarmSound, playClickSound } = useSound();

  function timerReducer(state: TimerState, action: TimerAction): TimerState {
    switch (action.type) {
      case 'START_TIMER':
        return { ...state, isRunning: true };
      case 'PAUSE_TIMER':
        return { ...state, isRunning: false };
      case 'RESET_TIMER':
        return {
          ...state,
          isRunning: false,
          timeRemaining: settings[state.phase],
        };
      case 'SET_PHASE':
        return {
          ...state,
          phase: action.payload,
          timeRemaining: settings[action.payload],
          isRunning: state.isRunning,
        };
      case 'TICK':
        return {
          ...state,
          timeRemaining: Math.max(0, state.timeRemaining - 1),
        };
      case 'COMPLETE_SESSION':
        return {
          ...state,
          sessionsCompleted: state.phase === 'pomodoro' ? state.sessionsCompleted + 1 : state.sessionsCompleted,
        };
      case 'UPDATE_TIME':
        return {
          ...state,
          timeRemaining: action.payload,
        };
      case 'UPDATE_SETTINGS':
        return {
          ...state,
          isRunning: false,
          timeRemaining: action.payload[state.phase],
        };
      default:
        return state;
    }
  }

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  useEffect(() => {
    let timerId: number | undefined;

    if (state.isRunning) {
      timerId = window.setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 1000);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [state.isRunning]);

  useEffect(() => {
    if (state.isRunning && state.timeRemaining === 0) {
      dispatch({ type: 'PAUSE_TIMER' });
      dispatch({ type: 'COMPLETE_SESSION' });
      
      playAlarmSound();
      
      const message = state.phase === 'pomodoro'
        ? 'Pomodoro completed! Take a break.'
        : 'Break time is over! Ready to focus?';
      
      showNotification('Pomodoro Timer', {
        body: message,
        icon: '/vite.svg',
      });

      const nextPhase = getNextPhase(state.phase, state.sessionsCompleted, settings.longBreakInterval);
      dispatch({ type: 'SET_PHASE', payload: nextPhase });

      const shouldAutoStart =
        (nextPhase === 'pomodoro' && settings.autoStartPomodoros) ||
        ((nextPhase === 'shortBreak' || nextPhase === 'longBreak') && settings.autoStartBreaks);

      if (shouldAutoStart) {
        dispatch({ type: 'START_TIMER' });
      }
    }
  }, [state.timeRemaining, state.isRunning, state.phase, state.sessionsCompleted, settings]);

  const getNextPhase = (
    currentPhase: TimerPhase,
    sessionsCompleted: number,
    longBreakInterval: number
  ): TimerPhase => {
    if (currentPhase === 'pomodoro') {
      return (sessionsCompleted + 1) % longBreakInterval === 0
        ? 'longBreak'
        : 'shortBreak';
    }
    return 'pomodoro';
  };

  const startTimer = () => {
    playClickSound();
    dispatch({ type: 'START_TIMER' });
  };

  const pauseTimer = () => {
    playClickSound();
    dispatch({ type: 'PAUSE_TIMER' });
  };

  const resetTimer = () => {
    playClickSound();
    dispatch({ type: 'RESET_TIMER' });
  };

  const setPhase = (phase: TimerPhase) => {
    playClickSound();
    dispatch({ type: 'SET_PHASE', payload: phase });
  };

  const updateSettings = (newSettings: TimerSettings) => {
    const { theme: currentTheme } = settings;
    const settingsWithoutTheme = { ...newSettings, theme: currentTheme };
    setSettings(settingsWithoutTheme);
    dispatch({ type: 'UPDATE_SETTINGS', payload: settingsWithoutTheme });
  };

  const updateTheme = (theme: 'light' | 'dark') => {
    setSettings({ ...settings, theme });
  };

  return (
    <TimerContext.Provider
      value={{
        state,
        settings,
        startTimer,
        pauseTimer,
        resetTimer,
        setPhase,
        updateSettings,
        updateTheme,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};