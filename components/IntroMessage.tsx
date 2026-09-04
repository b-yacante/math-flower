"use client";

import { Fragment } from "react";
import { useReveal } from "./RevealProvider";

const WORD_TRANSITION_MS = 450;

// One entry per line of the message; blocks are separated by <br />.
const BLOCKS = [
  "Quizás las flores amarillas se hicieron famosas por una canción y por una historia de amor, pero hoy quiero darle mi propio significado: son una forma de decirte que te elijo y que quiero compartir con vos todo lo lindo que pueda traer esta nueva primavera y que espero compartir muchas mas con vos.",
];

const BLOCK_WORDS = BLOCKS.map((block) => block.split(" "));
const TOTAL_WORDS = BLOCK_WORDS.reduce(
  (total, words) => total + words.length,
  0,
);

interface WordProps {
  children: string;
  revealed: boolean;
  animate: boolean;
}

function Word({ children, revealed, animate }: WordProps) {
  return (
    <span
      className="inline-block"
      style={{
        opacity: revealed ? 1 : 0,
        filter: revealed ? "blur(0px)" : "blur(4px)",
        transform: revealed
          ? "translateY(0) scale(1)"
          : "translateY(0.35em) scale(0.9)",
        transition: animate
          ? `transform ${WORD_TRANSITION_MS}ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity ${WORD_TRANSITION_MS}ms ease-out, filter ${WORD_TRANSITION_MS}ms ease-out`
          : "none",
      }}
    >
      {children}
    </span>
  );
}

export function IntroMessage() {
  const { progress, prefersReducedMotion } = useReveal();
  // Same clock as the petals: the last word lands with the last petal.
  const revealedWords = Math.round(progress * TOTAL_WORDS);

  let wordIndex = 0;

  return (
    <p className="text-pretty text-sm leading-relaxed text-zinc-800 sm:text-base">
      {BLOCK_WORDS.map((words, blockIndex) => (
        <Fragment key={blockIndex}>
          {blockIndex > 0 && <br />}
          {words.map((word) => {
            const index = wordIndex++;
            return (
              <Fragment key={index}>
                <Word
                  revealed={index < revealedWords}
                  animate={!prefersReducedMotion}
                >
                  {word}
                </Word>{" "}
              </Fragment>
            );
          })}
        </Fragment>
      ))}
    </p>
  );
}
