"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Petal } from "./Petal";
import { getPetalColor, getPetalPosition } from "@/lib/phyllotaxis";

const PETAL_COUNT = 144; // Fibonacci number, a nod to the golden ratio
const REVEAL_INTERVAL_MS = 25;
const SCALE = 6;
const PETAL_LENGTH = 16;
const PETAL_WIDTH = 8;
const CENTER_RADIUS = 14;

const MAX_RADIUS = SCALE * Math.sqrt(PETAL_COUNT - 1);
const VIEW_R = MAX_RADIUS + PETAL_LENGTH / 2 + 6;

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

export function GoldenFlower() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  useEffect(() => {
    if (!isPlaying || visibleCount >= PETAL_COUNT) return;
    const t = setTimeout(() => {
      setVisibleCount((c) => c + 1);
    }, REVEAL_INTERVAL_MS);
    return () => clearTimeout(t);
  }, [isPlaying, visibleCount]);

  function handlePlay() {
    if (prefersReducedMotion) {
      setIsPlaying(false);
      setVisibleCount(PETAL_COUNT);
      return;
    }
    setVisibleCount(0);
    setIsPlaying(true);
  }

  const petals = Array.from({ length: visibleCount }, (_, n) => {
    const { x, y, angleDeg } = getPetalPosition(n, SCALE);
    return (
      <Petal
        key={n}
        x={x}
        y={y}
        angleDeg={angleDeg}
        length={PETAL_LENGTH}
        width={PETAL_WIDTH}
        color={getPetalColor(n, PETAL_COUNT)}
        animate={!prefersReducedMotion}
      />
    );
  });

  return (
    <div className="flex flex-col items-center gap-8">
      <svg
        viewBox={`${-VIEW_R} ${-VIEW_R} ${VIEW_R * 2} ${VIEW_R * 2}`}
        className="h-[min(80vh,80vw)] w-[min(80vh,80vw)]"
        role="img"
        aria-label="Flor generada con el ángulo áureo"
      >
        <defs>
          <radialGradient id="centerGradient">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#92400e" />
          </radialGradient>
        </defs>
        {petals}
        <circle r={CENTER_RADIUS} fill="url(#centerGradient)" />
      </svg>

      <button
        type="button"
        onClick={handlePlay}
        className="rounded-full bg-amber-400 px-8 py-3 text-sm font-semibold text-zinc-900 shadow-lg shadow-amber-950/40 transition-colors hover:bg-amber-300 active:bg-amber-500"
      >
        Play
      </button>
    </div>
  );
}
