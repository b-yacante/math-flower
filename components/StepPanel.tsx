import type { ReactNode } from "react";

interface StepPanelProps {
  /** Se renderiza como el <h2> del paso; el <h1> vive en el header del Stepper. */
  title: string;
  /** Deja el título solo para lectores de pantalla. */
  titleHidden?: boolean;
  /** Bloque de texto. Siempre arriba. */
  children: ReactNode;
  /** Bloque visual (imagen, svg, ilustración). Siempre abajo. */
  visual: ReactNode;
}

/**
 * Layout compartido por todos los pasos: texto arriba, algo visual abajo, todo
 * centrado. El slot visual es `flex: 1 0 14rem`, así se come el espacio que
 * sobra sin bajar nunca de 224px — por eso ningún paso necesita clamps de vh.
 */
export function StepPanel({
  title,
  titleHidden = false,
  children,
  visual,
}: StepPanelProps) {
  return (
    <section className="flex grow flex-col items-center justify-center gap-5 px-5 py-4 sm:gap-6 sm:px-6">
      <div className="flex w-full max-w-prose shrink-0 flex-col items-center gap-3 text-center">
        <h2
          className={
            titleHidden
              ? "sr-only"
              : "text-balance text-lg font-semibold text-amber-700 sm:text-xl"
          }
        >
          {title}
        </h2>
        {children}
      </div>

      <div className="flex w-full shrink-0 grow basis-56 items-center justify-center">
        {visual}
      </div>
    </section>
  );
}
