import { useCallback, useEffect, useRef, useState } from "react";
import type { TimerStatus } from "../core/models/TimerStatus";

export function useTimer(onStop?: (timeMs: number) => void) {
  // States and ref
  const [status, setStatus] = useState<TimerStatus>("idle");
  const [time, setTime] = useState(0);

  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  //const armedRef = useRef(false);

  // Arrow functions startTimer, stopTimer, (resetTimer)
  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    setStatus("running");

    intervalRef.current = window.setInterval(() => {
      setTime(Date.now() - (startTimeRef.current ?? Date.now()));
    }, 10);
  }, []);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setStatus("idle");

    const finalTime = Date.now() - (startTimeRef.current ?? Date.now())
    startTimeRef.current = null;

    console.log(`Time taken for the solve: ${finalTime}`);

    onStop?.(finalTime);
  }, [onStop]);

  // Spacebar handler
  useEffect(() => {
    const handleSpaceDown = (e: KeyboardEvent) => {
      if (e.code !== "Space") 
        return (0);

      e.preventDefault();

      if (status === "idle") {
        setStatus("armed");
        return (0);
      }

      if (status === "running") {
        stopTimer();
      }
    };

    const handleSpaceUp = (e: KeyboardEvent) => {
      if (e.code !== "Space")
        return (0);

      e.preventDefault();

      if (status === "armed") {
        startTimer();
      }
    };

    window.addEventListener("keydown", handleSpaceDown);
    window.addEventListener("keyup", handleSpaceUp);

    return () => {
      window.removeEventListener("keydown", handleSpaceDown);
      window.removeEventListener("keyup", handleSpaceUp);
    };
  }, [status, startTimer, stopTimer]);

  return {
    time,
    status,
  };
}