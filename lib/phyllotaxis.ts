// Golden angle: 360deg * (1 - 1/phi), phi = (1 + sqrt(5)) / 2
export const GOLDEN_ANGLE_DEG = 360 * (1 - 2 / (1 + Math.sqrt(5))); // ~137.50776

export interface PetalPosition {
  index: number;
  angleDeg: number;
  x: number;
  y: number;
}

/**
 * Vogel's model: angle_n = n * golden angle, radius_n = scale * sqrt(n).
 * The same formula behind sunflower seed heads and pinecone scales.
 */
export function getPetalPosition(n: number, scale: number): PetalPosition {
  const angleDeg = (n * GOLDEN_ANGLE_DEG) % 360;
  const angleRad = (angleDeg * Math.PI) / 180;
  const radius = scale * Math.sqrt(n);
  return {
    index: n,
    angleDeg,
    x: radius * Math.cos(angleRad),
    y: radius * Math.sin(angleRad),
  };
}

export interface PetalColor {
  fill: string;
  stroke: string;
}

/**
 * Barrido de tono corto (42° -> 52°): la flor lee como un solo amarillo dorado,
 * no como un degradado naranja -> amarillo.
 *
 * El amarillo puro casi no contrasta contra el fondo hueso, así que el relleno
 * se deja saturado y cada pétalo se recorta con su mismo tono en oscuro. Bajar
 * la luminosidad del relleno lo haría resaltar, pero a costa de volverlo mostaza.
 */
export function getPetalColor(n: number, total: number): PetalColor {
  const t = n / Math.max(total - 1, 1);
  const hue = (42 + t * 10).toFixed(1);
  return {
    fill: `hsl(${hue} 100% 52%)`,
    stroke: `hsl(${hue} 85% 33%)`,
  };
}
