import pikattioli from "@/public/img/Pikattioli.png";
import { StepImage } from "../StepImage";
import { StepPanel } from "../StepPanel";

export function OutroStep() {
  return (
    <StepPanel
      title=" Feliz primavera, amor! 🌼"
      visual={<StepImage src={pikattioli} alt="Pikattioli" />}
    >
      {/* TODO: reemplazar por el texto real del último paso. */}
      <p className="text-pretty text-sm leading-relaxed text-zinc-700 sm:text-base">
        Espero te haya gustado este pequeño regalo.
      </p>
    </StepPanel>
  );
}
