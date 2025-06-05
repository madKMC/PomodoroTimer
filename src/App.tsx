import React from 'react';
import { TimerProvider } from './contexts/TimerContext';
import TimerDisplay from './components/TimerDisplay';
import TimerControls from './components/TimerControls';
import PhaseSelector from './components/PhaseSelector';
import SessionCounter from './components/SessionCounter';
import SettingsPanel from './components/SettingsPanel';
import ThemeToggle from './components/ThemeToggle';
import { useTimer } from './contexts/TimerContext';
import { THEME_COLORS, DEFAULT_TIMER_SETTINGS } from './constants';

function AppContent() {
  const { settings } = useTimer();
  // Ensure theme is always a valid value, defaulting to the default theme if invalid
  const theme = settings?.theme && THEME_COLORS[settings.theme] ? settings.theme : DEFAULT_TIMER_SETTINGS.theme;

  return (
    <div className={`min-h-screen ${THEME_COLORS[theme].background} flex flex-col items-center justify-center p-4 relative transition-colors duration-300`}>
      <div className={`${THEME_COLORS[theme].card} p-8 rounded-2xl shadow-lg max-w-md w-full mx-auto transition-colors duration-300`}>
        <h1 className={`text-2xl font-bold text-center mb-6 ${THEME_COLORS[theme].text}`}>Pomodoro Timer</h1>
        
        <PhaseSelector />
        <TimerDisplay />
        <TimerControls />
        <SessionCounter />
        
        <ThemeToggle />
        <SettingsPanel />
      </div>
      
      <footer className={`mt-8 text-sm ${THEME_COLORS[theme].textSecondary}`}>
        © {new Date().getFullYear()} Kaylen Cairns
      </footer>
    </div>
  );
}

function App() {
  return (
    <TimerProvider>
      <AppContent />
    </TimerProvider>
  );
}

export default App;