import React, { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { useTimer } from '../contexts/TimerContext';
import { TimerSettings } from '../types';
import { THEME_COLORS, DEFAULT_TIMER_SETTINGS } from '../constants';

const SettingsPanel: React.FC = () => {
  const { settings, updateSettings } = useTimer();
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState<TimerSettings>(settings);

  // Ensure we always have a valid theme
  const currentTheme = settings?.theme && THEME_COLORS[settings.theme] ? settings.theme : DEFAULT_TIMER_SETTINGS.theme;

  const handleOpen = () => {
    setFormValues(settings);
    setIsOpen(true);
  };
  
  const handleClose = () => setIsOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) * 60 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formValues);
    handleClose();
  };

  const handleResetToDefaults = () => {
    const newSettings = {
      ...DEFAULT_TIMER_SETTINGS,
      theme: settings.theme // Preserve the current theme
    };
    setFormValues(newSettings);
    updateSettings(newSettings);
  };

  const toMinutes = (seconds: number) => Math.floor(seconds / 60);

  return (
    <>
      <button 
        onClick={handleOpen}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
        aria-label="Open Settings"
      >
        <Settings size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${THEME_COLORS[currentTheme].card} rounded-lg w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto`}>
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              aria-label="Close Settings"
            >
              <X size={24} />
            </button>
            
            <h2 className={`text-2xl font-bold mb-6 ${THEME_COLORS[currentTheme].text}`}>Settings</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className={`text-lg font-medium ${THEME_COLORS[currentTheme].text}`}>Time (minutes)</h3>
                    <button
                      type="button"
                      onClick={handleResetToDefaults}
                      className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Reset to Defaults
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className={`block text-sm font-medium ${THEME_COLORS[currentTheme].textSecondary} mb-1`}>
                        Pomodoro
                      </label>
                      <input
                        type="number"
                        name="pomodoro"
                        min="1"
                        max="60"
                        value={toMinutes(formValues.pomodoro)}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium ${THEME_COLORS[currentTheme].textSecondary} mb-1`}>
                        Short Break
                      </label>
                      <input
                        type="number"
                        name="shortBreak"
                        min="1"
                        max="30"
                        value={toMinutes(formValues.shortBreak)}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium ${THEME_COLORS[currentTheme].textSecondary} mb-1`}>
                        Long Break
                      </label>
                      <input
                        type="number"
                        name="longBreak"
                        min="1"
                        max="60"
                        value={toMinutes(formValues.longBreak)}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className={`text-lg font-medium mb-2 ${THEME_COLORS[currentTheme].text}`}>Auto Start</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="autoStartBreaks"
                        name="autoStartBreaks"
                        checked={formValues.autoStartBreaks}
                        onChange={handleChange}
                        className="h-4 w-4 text-red-500 focus:ring-red-500 rounded"
                      />
                      <label htmlFor="autoStartBreaks" className={`ml-2 text-sm ${THEME_COLORS[currentTheme].text}`}>
                        Auto-start breaks
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="autoStartPomodoros"
                        name="autoStartPomodoros"
                        checked={formValues.autoStartPomodoros}
                        onChange={handleChange}
                        className="h-4 w-4 text-red-500 focus:ring-red-500 rounded"
                      />
                      <label htmlFor="autoStartPomodoros" className={`ml-2 text-sm ${THEME_COLORS[currentTheme].text}`}>
                        Auto-start pomodoros
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className={`block text-lg font-medium mb-2 ${THEME_COLORS[currentTheme].text}`}>
                    Long Break Interval
                  </label>
                  <input
                    type="number"
                    name="longBreakInterval"
                    min="1"
                    max="10"
                    value={formValues.longBreakInterval}
                    onChange={(e) => setFormValues(prev => ({
                      ...prev,
                      longBreakInterval: parseInt(e.target.value)
                    }))}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
                  />
                  <p className={`text-sm ${THEME_COLORS[currentTheme].textSecondary} mt-1`}>
                    The number of pomodoros before a long break
                  </p>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  className={`mr-4 px-4 py-2 ${THEME_COLORS[currentTheme].textSecondary} hover:text-gray-900 dark:hover:text-white`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors dark:bg-red-600 dark:hover:bg-red-700"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsPanel;