import { useEffect, useRef, useState } from "react";
import type { TimerStatus } from "../core/models/TimerStatus";

export function useTimer(OnStop?: (timeMs: number) => void) {
  // States and ref
  const [status, setStatus] = useState<TimerStatus>("idle");
  const [time, setTime] = useState(0);

  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const armedRef = userRef(false);

  // Arrow functions startTimer, stopTimer, resetTimer

  // Spacebar handler
}