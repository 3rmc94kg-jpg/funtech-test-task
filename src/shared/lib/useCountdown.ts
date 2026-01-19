import { useState, useEffect, useCallback } from 'react';

interface CountdownTime {
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const useCountdown = (targetDate: Date | string): CountdownTime => {
  const calculateTimeLeft = useCallback((): CountdownTime => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();

    if (difference <= 0) {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true,
      };
    }

    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isExpired: false,
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return timeLeft;
};

export const formatTime = (value: number): string => {
  return value.toString().padStart(2, '0');
};