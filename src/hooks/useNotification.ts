import { useEffect, useState } from 'react';

export function useNotification() {
  const [permission, setPermission] = useState<NotificationPermission | null>(null);

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      try {
        const result = await Notification.requestPermission();
        setPermission(result);
        return result;
      } catch (error) {
        console.error('Error requesting notification permission:', error);
        return 'denied' as NotificationPermission;
      }
    }
    return 'denied' as NotificationPermission;
  };

  const showNotification = (title: string, options?: NotificationOptions) => {
    if (permission === 'granted') {
      try {
        return new Notification(title, options);
      } catch (error) {
        console.error('Error showing notification:', error);
        return null;
      }
    }
    return null;
  };

  return {
    permission,
    requestPermission,
    showNotification,
    supported: 'Notification' in window,
  };
}