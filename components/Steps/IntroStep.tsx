import { StepImage } from "../StepImage";
import { IntroMessage } from "../IntroMessage";
import { RevealProvider } from "../RevealProvider";
import { StepPanel } from "../StepPanel";
import chemss from "@/public/img/chemss.png";

export function IntroStep() {
  return (
    <RevealProvider autoPlay>
      <StepPanel
        title="La flor del ángulo áureo"
        // El mensaje ya es el texto visible del paso: un <h2> a la vista
        // duplicaría el header y se comería alto que este paso no tiene.
        titleHidden
        visual={<StepImage src={chemss} alt="chemss" />}
      >
        <IntroMessage />
      </StepPanel>
    </RevealProvider>
  );
}
