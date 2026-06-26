import { useCallback, useEffect, useRef, useState } from "react";
import type { TimerStatus } from "../core/models/TimerStatus";

export function useTimer(onStop?: (timeMs: number) => void) {
  // States and ref
  const [status, setStatus] = useState<TimerStatus>("idle");
  const [time, setTime] = useState(0);

  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const armedAtRef = useRef<number | null>(null);
  const statusRef = useRef(status);
  const armedHeldRef = useRef(false);
  const readyTimeoutRef = useRef<number | null>(null);

  // Arrow functions startTimer, stopTimer, (resetTimer)
  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    setStatus("running");

    intervalRef.current = window.setInterval(() => {
      setTime(Date.now() - (startTimeRef.current ?? Date.now()));
    }, 30);
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

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  // Spacebar handler
  useEffect(() => {
    const handleSpaceDown = (e: KeyboardEvent) => {
      if (e.code !== "Space") 
        return (0);

      if (armedHeldRef.current) 
        return (0); 
      armedHeldRef.current = true;

      e.preventDefault();

      if (statusRef.current === "idle") {
        setStatus("armed");
        armedAtRef.current = Date.now();
        
        readyTimeoutRef.current = window.setTimeout(() => {
          if (armedHeldRef.current && statusRef.current === "armed") {
            setStatus("ready");
            setTime(0);
          }
        }, 300);
      }

      if (statusRef.current === "running") {
        stopTimer();
      }
    };

    const handleSpaceUp = (e: KeyboardEvent) => {
      if (e.code !== "Space")
        return (0);

      armedHeldRef.current = false;
      if (readyTimeoutRef.current !== null) {
        clearTimeout(readyTimeoutRef.current);
        readyTimeoutRef.current = null;
      }

      e.preventDefault();

      if (statusRef.current === "ready") {
        startTimer();
        armedAtRef.current = null;
      } 
      else if (statusRef.current === "armed") {
        setStatus("idle");
      }
    };

    window.addEventListener("keydown", handleSpaceDown);
    window.addEventListener("keyup", handleSpaceUp);

    return () => {
      window.removeEventListener("keydown", handleSpaceDown);
      window.removeEventListener("keyup", handleSpaceUp);

      if (readyTimeoutRef.current !== null) {
        clearTimeout(readyTimeoutRef.current);
        readyTimeoutRef.current = null;
      }
    };
  }, [startTimer, stopTimer]);

  return {
    time,
    status,
  };
}