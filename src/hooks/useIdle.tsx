"use client";
import { useEffect, useRef, useState } from "react";

export default function useIdle(timeoutMs = 10000) {
  const [idle, setIdle] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const reset = () => {
      setIdle(false);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setIdle(true), timeoutMs);
    };

    const events = ["mousemove", "mousedown", "scroll", "keydown", "touchstart", "pointermove"];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));

    // start timer
    reset();

    return () => {
      events.forEach((e) => window.removeEventListener(e, reset));
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [timeoutMs]);

  return { idle, resetIdle: () => { setIdle(false); if (timerRef.current) window.clearTimeout(timerRef.current); } };
}