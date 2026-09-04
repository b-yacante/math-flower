"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { REVEAL_INTERVAL_MS, REVEAL_STEPS } from "@/lib/reveal";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

interface Reveal {
  /** Steps revealed so far, one per petal. */
  step: number;
  /** step / REVEAL_STEPS, for consumers that reveal a share of their content. */
  progress: number;
  prefersReducedMotion: boolean;
  play: () => void;
}

const RevealContext = createContext<Reveal | null>(null);

export function useReveal(): Reveal {
  const reveal = useContext(RevealContext);
  if (!reveal) {
    throw new Error("useReveal must be used inside <RevealProvider>");
  }
  return reveal;
}

export function RevealProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  useEffect(() => {
    if (!isPlaying || step >= REVEAL_STEPS) return;
    const t = setTimeout(() => {
      setStep((s) => s + 1);
    }, REVEAL_INTERVAL_MS);
    return () => clearTimeout(t);
  }, [isPlaying, step]);

  const play = useCallback(() => {
    if (prefersReducedMotion) {
      setIsPlaying(false);
      setStep(REVEAL_STEPS);
      return;
    }
    setStep(0);
    setIsPlaying(true);
  }, [prefersReducedMotion]);

  const value = useMemo(
    () => ({
      step,
      progress: step / REVEAL_STEPS,
      prefersReducedMotion,
      play,
    }),
    [step, prefersReducedMotion, play],
  );

  return (
    <RevealContext.Provider value={value}>{children}</RevealContext.Provider>
  );
}
