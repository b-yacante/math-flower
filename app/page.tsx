import { GoldenFlower } from "@/components/GoldenFlower";
import { Message } from "@/components/Message";
import { RevealProvider } from "@/components/RevealProvider";

export default function Home() {
  return (
    <div className="grid place-items-center min-h-screen bg-linear-to-b from-zinc-950 via-zinc-900 to-black px-6 py-10">
      <RevealProvider>
        <Message />
        <GoldenFlower />
      </RevealProvider>
    </div>
  );
}
