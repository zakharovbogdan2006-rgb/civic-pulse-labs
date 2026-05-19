import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AccessDialog } from "./AccessDialog";

export function Vision() {
  return (
    <section id="vision" className="relative py-28 bg-hero text-white overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[1000px] rounded-full bg-aurora opacity-25 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <div className="text-xs uppercase tracking-widest text-white/50 mb-4">The vision</div>
        <h2 className="font-display text-5xl md:text-7xl leading-[1.02]">
          AI as <span className="text-gradient">connective infrastructure</span> — never a replacement for human connection.
        </h2>
        <p className="mt-8 text-white/70 max-w-2xl mx-auto text-lg">
          We believe the next generation of urban wellbeing won't come from more screens or smarter apps. It will come from cities that use technology quietly — to make streets safer, parks livelier, and neighbors familiar again.
        </p>

        <div className="mt-14 grid md:grid-cols-4 gap-3 text-left">
          {[
            { t: "A recept every 10 minutes", s: "Across three cities by month 18." },
            { t: "900,000 lessons learned", s: "We are scaling the proven UK model, not reinventing it." },
            { t: "0 loneliness scores on people", s: "Not one resident is ever labelled. By design." },
            { t: "€2M · 18 months · 3 cities", s: "Defensible, deployable, measurable." },
          ].map((c, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
              <div className="font-display text-xl">{c.t}</div>
              <div className="mt-2 text-xs text-white/50">{c.s}</div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-3">
          <AccessDialog
            mode="register"
            trigger={
              <Button size="lg" className="rounded-full bg-white text-[color:var(--primary)] hover:bg-white/90 shadow-glow">
                Partner with Civica <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            }
          />
          <a href="/civica-1-pager.pdf" download>
            <Button size="lg" variant="outline" className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10">
              Download the 1-pager
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
