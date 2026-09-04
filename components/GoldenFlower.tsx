"use client";

import { Petal } from "./Petal";
import { useReveal } from "./RevealProvider";
import { getPetalColor, getPetalPosition } from "@/lib/phyllotaxis";
import { REVEAL_STEPS } from "@/lib/reveal";

const PETAL_COUNT = REVEAL_STEPS; // the shared clock ticks once per petal
const SCALE = 6;
const PETAL_LENGTH = 16;
const PETAL_WIDTH = 8;
const CENTER_RADIUS = 14;

const MAX_RADIUS = SCALE * Math.sqrt(PETAL_COUNT - 1);
const VIEW_R = MAX_RADIUS + PETAL_LENGTH / 2 + 6;

export function GoldenFlower() {
  const { step, prefersReducedMotion, play } = useReveal();

  const petals = Array.from({ length: step }, (_, n) => {
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
        onClick={play}
        className="rounded-full bg-amber-400 px-8 py-3 text-sm font-semibold text-zinc-900 shadow-lg shadow-amber-950/40 transition-colors hover:bg-amber-300 active:bg-amber-500"
      >
        Play
      </button>
    </div>
  );
}
