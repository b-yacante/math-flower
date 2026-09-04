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
  const { step, prefersReducedMotion } = useReveal();

  const petals = Array.from({ length: step }, (_, n) => {
    const { x, y, angleDeg } = getPetalPosition(n, SCALE);
    const { fill, stroke } = getPetalColor(n, PETAL_COUNT);
    return (
      <Petal
        key={n}
        x={x}
        y={y}
        angleDeg={angleDeg}
        length={PETAL_LENGTH}
        width={PETAL_WIDTH}
        fill={fill}
        stroke={stroke}
        animate={!prefersReducedMotion}
      />
    );
  });

  // Sin tamaño propio: llena la caja que le da el slot visual del paso y el
  // viewBox se encarga de mantener el dibujo cuadrado y centrado adentro.
  return (
    <svg
      viewBox={`${-VIEW_R} ${-VIEW_R} ${VIEW_R * 2} ${VIEW_R * 2}`}
      className="h-full w-full"
      role="img"
      aria-label="Flor generada con el ángulo áureo"
    >
      <defs>
        {/* Recorrido corto dentro del mismo amarillo: solo da volumen al centro,
            sin caer en el marrón que cortaba la flor en dos colores. */}
        <radialGradient id="centerGradient">
          <stop offset="0%" stopColor="#ffd54a" />
          <stop offset="100%" stopColor="#e0a007" />
        </radialGradient>
      </defs>
      {petals}
      <circle
        r={CENTER_RADIUS}
        fill="url(#centerGradient)"
        stroke="hsl(46 85% 33%)"
        strokeOpacity={0.75}
        strokeWidth={0.5}
      />
    </svg>
  );
}
