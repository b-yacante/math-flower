"use client";

import { useEffect, useState } from "react";

interface PetalProps {
  x: number;
  y: number;
  angleDeg: number;
  length: number;
  width: number;
  fill: string;
  /** Contorno del pétalo: lo despega del fondo sin apagar el relleno. */
  stroke: string;
  animate: boolean;
  transitionMs?: number;
}

function petalPathD(length: number, width: number): string {
  const h = length / 2;
  const w = width / 2;
  return `M ${-h},0 C ${-h * 0.3},${-w} ${h * 0.3},${-w} ${h},0 C ${h * 0.3},${w} ${-h * 0.3},${w} ${-h},0 Z`;
}

export function Petal({
  x,
  y,
  angleDeg,
  length,
  width,
  fill,
  stroke,
  animate,
  transitionMs = 450,
}: PetalProps) {
  const [entered, setEntered] = useState(!animate);

  useEffect(() => {
    if (!animate) return;
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  return (
    <g transform={`translate(${x} ${y}) rotate(${angleDeg})`}>
      <path
        d={petalPathD(length, width)}
        fill={fill}
        stroke={stroke}
        strokeOpacity={0.75}
        strokeWidth={0.5}
        style={{
          transformOrigin: "center",
          transformBox: "fill-box",
          transform: entered ? "scale(1)" : "scale(0)",
          opacity: entered ? 1 : 0,
          transition: animate
            ? `transform ${transitionMs}ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity ${transitionMs}ms ease-out`
            : "none",
        }}
      />
    </g>
  );
}
