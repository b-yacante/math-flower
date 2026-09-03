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

// Warm floral hue sweep: magenta -> red -> orange -> yellow
export function getPetalColor(n: number, total: number): string {
  const t = n / Math.max(total - 1, 1);
  const hue = (380 + t * 40) % 360;
  return `hsl(${hue.toFixed(1)} 70% 55%)`;
}
