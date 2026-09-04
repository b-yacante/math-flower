"use client";

import { useReveal } from "./RevealProvider";

export function ReplayButton() {
  const { play } = useReveal();

  return (
    <button
      type="button"
      onClick={play}
      className="shrink-0 rounded-full border border-zinc-900/15 px-4 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:border-amber-600/40 hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
    >
      Repetir
    </button>
  );
}
