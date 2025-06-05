export function useSound() {
  const playSound = (frequency = 440, duration = 200, volume = 0.5) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration / 1000);
      
      // Clean up
      setTimeout(() => {
        audioContext.close();
      }, duration + 100);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const playAlarmSound = () => {
    // Play a sequence of beeps
    playSound(880, 200, 0.3);
    setTimeout(() => playSound(880, 200, 0.3), 250);
    setTimeout(() => playSound(880, 400, 0.3), 500);
  };

  const playClickSound = () => {
    playSound(660, 40, 0.1);
  };

  return {
    playAlarmSound,
    playClickSound,
  };
}