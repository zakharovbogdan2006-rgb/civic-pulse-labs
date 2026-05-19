import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Problem } from "@/components/site/Problem";
import { Platform } from "@/components/site/Platform";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Recept } from "@/components/site/Recept";
import { Principles } from "@/components/site/Principles";
import { Demo } from "@/components/site/Demo";
import { Methodology } from "@/components/site/Methodology";
import { Cities } from "@/components/site/Cities";
import { Vision } from "@/components/site/Vision";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Civica — AI Infrastructure for Fighting Urban Loneliness" },
      { name: "description", content: "Civica helps cities map social isolation, strengthen neighborhoods, and reconnect residents with real communities using AI as connective civic infrastructure." },
      { property: "og:title", content: "Civica — AI Infrastructure for Fighting Urban Loneliness" },
      { property: "og:description", content: "AI-powered urban wellbeing platform for municipalities and city planners. Map loneliness, analyze neighborhoods, prescribe community." },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <Hero />
      <Problem />
      <Platform />
      <HowItWorks />
      <Recept />
      <Principles />
      <Demo />
      <Methodology />
      <Cities />
      <Vision />
      <Footer />
    </main>
  );
}
