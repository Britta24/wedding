import { useEffect, useState } from 'react';

// Ticks every second and returns the time left until `target` (ISO string with offset).
export function useCountdown(target) {
  const end = new Date(target).getTime();
  const calc = () => {
    const diff = Math.max(0, end - Date.now());
    return {
      done: diff === 0,
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  };
  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return time;
}
