import Hero from "@/app/_components/hero";
import Features from "@/app/_components/features";
import Testimonials from "@/app/_components/testimonials";
import CallToAction from "@/app/_components/call-to-action";
import PortfolioGrid from "@/app/_components/portfoliogrid";
import Who from "./_components/who";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Features />
      <Testimonials />
      <Who />
      <PortfolioGrid />
      <CallToAction />
    </main>
  );
}
