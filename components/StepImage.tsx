import Image, { type StaticImageData } from "next/image";

interface StepImageProps {
  /** Import estático desde public/, así Next infiere width, height y blurDataURL. */
  src: StaticImageData;
  alt: string;
}

/**
 * Reemplazo de <VisualPlaceholder> cuando el paso ya tiene su imagen real.
 * Igual que el placeholder: `self-stretch` para ocupar todo el alto que el slot
 * visual le deja libre, y `object-contain` para escalar sin recortar ni deformar.
 */
export function StepImage({ src, alt }: StepImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      placeholder="blur"
      sizes="(min-width: 640px) 28rem, 90vw"
      className="h-full w-full max-w-md self-stretch rounded-3xl object-contain"
    />
  );
}
