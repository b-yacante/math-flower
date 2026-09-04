import { FlowerStep } from "@/components/Steps/FlowerStep";
import { IntroStep } from "@/components/Steps/IntroStep";
import { OutroStep } from "@/components/Steps/OutroStep";
import { Stepper } from "@/components/Stepper";

export default function Home() {
  return (
    <Stepper>
      <IntroStep />
      <FlowerStep />
      <OutroStep />
    </Stepper>
  );
}
