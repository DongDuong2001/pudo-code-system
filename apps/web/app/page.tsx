import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WorkflowSection } from "@/components/WorkflowSection";
import { ConfigGenerator } from "@/components/ConfigGenerator";
import { McpHub } from "@/components/McpHub";
import { ScoreCalculator } from "@/components/ScoreCalculator";
import { PlaybooksShowcase } from "@/components/PlaybooksShowcase";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#09090b]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WorkflowSection />
        <ConfigGenerator />
        <McpHub />
        <ScoreCalculator />
        <PlaybooksShowcase />
      </main>
      <Footer />
    </div>
  );
}
