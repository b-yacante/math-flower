"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Shell del sitio: header persistente, área central que centra el paso activo,
 * y footer con el botón de avance. Avance lineal, sin volver atrás.
 *
 * Renderiza únicamente el paso activo. Como Children.toArray re-keyea a los
 * hijos, cambiar de paso desmonta y remonta el panel: eso reinicia solo la
 * animación de entrada CSS y vuelve a disparar el autoPlay de la flor.
 */
export function Stepper({ children }: { children: ReactNode }) {
  const steps = Children.toArray(children);
  const total = steps.length;
  const [index, setIndex] = useState(0);
  const isLast = index === total - 1;

  const mainRef = useRef<HTMLElement>(null);
  const didMount = useRef(false);

  // Al cambiar de paso: volver al tope y mover el foco al panel nuevo. El foco
  // es obligatorio porque "Siguiente" se desmonta en el último paso; sin esto
  // el foco se cae a <body> y el Tab arranca de cero.
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    const main = mainRef.current;
    if (!main) return;
    main.scrollTop = 0;
    main.focus();
  }, [index]);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-linear-to-b from-[#fefdfb] via-[#faf7f0] to-[#f2ebdd] text-zinc-900">
      {/* <header className="shrink-0 px-5 pt-6 pb-4 text-center sm:px-6">
        <h1 className="text-balance text-xl font-bold text-zinc-900 sm:text-2xl">
          Feliz primavera, mi amor! 🌼
        </h1>
      </header> */}

      <main
        ref={mainRef}
        tabIndex={-1}
        className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain focus:outline-none pt-6"
      >
        {/* min-h-full centra el paso cuando entra y, cuando no entra, deja el
            espacio libre en cero para que justify-center no recorte el tope. */}
        <div key={index} className="step-in flex min-h-full flex-col">
          {steps[index]}
        </div>
      </main>

      <footer className="flex min-h-18 shrink-0 items-center justify-between gap-4 px-5 pt-2 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6">
        <p role="status" className="text-xs tabular-nums text-zinc-600">
          Paso {index + 1} de {total}
        </p>
        {!isLast && (
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(i + 1, total - 1))}
            className="rounded-full bg-amber-400 px-7 py-3 text-sm font-semibold text-zinc-900 shadow-lg shadow-amber-500/25 transition-colors hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 active:bg-amber-500"
          >
            Siguiente
          </button>
        )}
      </footer>
    </div>
  );
}
