import { GoldenFlower } from "../GoldenFlower";
import { Message } from "../Message";
import { ReplayButton } from "../ReplayButton";
import { RevealProvider } from "../RevealProvider";
import { StepPanel } from "../StepPanel";

export function FlowerStep() {
  return (
    <RevealProvider autoPlay>
      <StepPanel
        title="La flor del ángulo áureo"
        // El mensaje ya es el texto visible del paso: un <h2> a la vista
        // duplicaría el header y se comería alto que este paso no tiene.
        titleHidden
        visual={
          <div className="flex h-full w-full flex-col items-center gap-3">
            <div className="min-h-0 w-full flex-1">
              <GoldenFlower />
            </div>
            <ReplayButton />
          </div>
        }
      >
        <Message />
      </StepPanel>
    </RevealProvider>
  );
}
