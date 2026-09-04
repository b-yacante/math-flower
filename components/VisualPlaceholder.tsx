/**
 * Hueco para el contenido visual de un paso. `self-stretch` pisa el centrado
 * del slot para que ocupe todo el alto disponible y se vea cuánto espacio va a
 * tener la imagen definitiva.
 *
 * Para reemplazarlo por una imagen real, la forma que encaja en el slot es:
 * <Image src="/foo.jpg" alt="…" width={800} height={800}
 *        className="h-full w-auto max-w-full rounded-3xl object-contain" />
 */
export function VisualPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex w-full max-w-md items-center justify-center self-stretch rounded-3xl border-2 border-dashed border-zinc-900/15 bg-zinc-900/3 p-6 text-center text-xs text-zinc-600">
      {label}
    </div>
  );
}
