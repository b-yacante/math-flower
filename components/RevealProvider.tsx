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

interface RevealProviderProps {
  children: ReactNode;
  /** Arranca la animación al montar, sin esperar un click. */
  autoPlay?: boolean;
}

export function RevealProvider({
  children,
  autoPlay = false,
}: RevealProviderProps) {
  const [step, setStep] = useState(0);
  // autoPlay solo define el valor inicial: el paso que monta este provider se
  // desmonta al cambiar de paso, así que arranca de nuevo por remontaje y no
  // hace falta un effect que dispare play() (que además sería setState síncrono
  // dentro de un effect).
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  useEffect(() => {
    if (!isPlaying || step >= REVEAL_STEPS) return;
    // La media query se lee acá, en cada tick, y no desde el state: durante la
    // hidratación useSyncExternalStore todavía devuelve el snapshot del server
    // (false), justo cuando arranca el autoPlay. Con reduced motion saltamos al
    // final en el primer tick, sin ráfaga de pétalos.
    const reduced = window.matchMedia(REDUCED_MOTION_QUERY).matches;
    const t = setTimeout(
      () => setStep((s) => (reduced ? REVEAL_STEPS : s + 1)),
      reduced ? 0 : REVEAL_INTERVAL_MS,
    );
    return () => clearTimeout(t);
  }, [isPlaying, step]);

  const play = useCallback(() => {
    setStep(0);
    setIsPlaying(true);
  }, []);

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
