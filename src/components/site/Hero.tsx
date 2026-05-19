import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, MapPin, Activity, Users } from "lucide-react";
import { AccessDialog } from "./AccessDialog";


export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero text-white pt-36 pb-28">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[640px] w-[1200px] rounded-full bg-aurora opacity-25 blur-3xl" />
      <div className="absolute inset-0 noise opacity-60 mix-blend-overlay" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs text-white/80 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-[color:var(--accent)]" />
            Civic AI · Now piloting with European municipalities
          </div>
        </div>

        <h1 className="text-center font-display text-5xl md:text-7xl leading-[1.02] max-w-5xl mx-auto">
          <span className="text-gradient">AI infrastructure</span> for fighting<br/> urban loneliness.
        </h1>

        <p className="mt-7 text-center text-lg text-white/70 max-w-2xl mx-auto">
          Civica helps cities map social isolation, strengthen neighborhoods, and connect residents to real communities — using AI as connective infrastructure, never a replacement for human relationships.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <AccessDialog
            mode="register"
            trigger={
              <Button size="lg" className="rounded-full bg-white text-[color:var(--primary)] hover:bg-white/90 shadow-glow">
                Explore the platform <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            }
          />
          <a href="#demo">
            <Button size="lg" variant="outline" className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10">
              See AI analysis demo
            </Button>
          </a>
        </div>

        {/* Floating dashboard preview */}
        <div className="relative mt-20 mx-auto max-w-5xl">
          <div className="absolute -inset-6 bg-aurora opacity-30 blur-3xl rounded-[2rem]" />
          <div className="relative rounded-2xl border border-white/10 bg-[oklch(0.18_0.05_255)]/80 backdrop-blur-xl shadow-elegant overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
              <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <div className="ml-3 text-xs text-white/40 font-mono">civica.city / dashboard / afrikaanderwijk</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
              <MiniStat icon={<Activity className="h-4 w-4" />} label="Connectedness" value="66 / 100" tone="success" />
              <MiniStat icon={<Users className="h-4 w-4" />} label="Active community ties" value="+18%" tone="accent" />
              <MiniStat icon={<MapPin className="h-4 w-4" />} label="Third places" value="12 mapped" tone="violet" />
            </div>
            <div className="px-5 pb-5">
              <CityMapSVG />
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs uppercase tracking-widest text-white/40">
          <span>EU Smart Cities</span>
          <span>·</span>
          <span>Nordic Innovation</span>
          <span>·</span>
          <span>Social Prescribing UK</span>
          <span>·</span>
          <span>WHO Urban Wellbeing</span>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: "success" | "accent" | "violet" }) {
  const color = tone === "success" ? "text-[color:var(--success)]" : tone === "accent" ? "text-[color:var(--accent)]" : "text-[color:var(--violet)]";
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className={`flex items-center gap-2 text-xs ${color}`}>{icon}{label}</div>
      <div className="mt-2 font-display text-2xl text-white">{value}</div>
      <div className="mt-3 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
        <div className={`h-full rounded-full ${tone === "success" ? "bg-[color:var(--success)]" : tone === "accent" ? "bg-[color:var(--accent)]" : "bg-[color:var(--violet)]"}`} style={{ width: tone === "success" ? "66%" : tone === "accent" ? "68%" : "55%" }} />
      </div>
    </div>
  );
}

function CityMapSVG() {
  return (
    <div className="relative rounded-xl border border-white/10 bg-[oklch(0.15_0.04_255)] overflow-hidden h-64">
      <svg viewBox="0 0 800 260" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="streetGrad" x1="0" x2="1">
            <stop offset="0" stopColor="oklch(0.55 0.12 265)" stopOpacity="0.4" />
            <stop offset="1" stopColor="oklch(0.78 0.13 165)" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="heat" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="oklch(0.78 0.13 165)" stopOpacity="0.6" />
            <stop offset="1" stopColor="oklch(0.78 0.13 165)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="heat2" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="oklch(0.7 0.16 295)" stopOpacity="0.55" />
            <stop offset="1" stopColor="oklch(0.7 0.16 295)" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* streets */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={30 + i * 30} x2="800" y2={30 + i * 30} stroke="url(#streetGrad)" strokeWidth="1" />
        ))}
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={`v${i}`} x1={40 + i * 56} y1="0" x2={40 + i * 56} y2="260" stroke="url(#streetGrad)" strokeWidth="1" />
        ))}
        {/* heat blobs */}
        <circle cx="180" cy="90" r="80" fill="url(#heat)" />
        <circle cx="520" cy="150" r="100" fill="url(#heat2)" />
        <circle cx="660" cy="60" r="60" fill="url(#heat)" />
        {/* nodes */}
        {[
          [180, 90, "var(--accent)"],
          [520, 150, "var(--violet)"],
          [660, 60, "var(--accent)"],
          [340, 200, "var(--success)"],
          [90, 180, "var(--violet)"],
        ].map(([x, y, c], i) => (
          <g key={i}>
            <circle cx={x as number} cy={y as number} r="14" fill="none" stroke={`oklch(0.78 0.13 165)`} strokeOpacity="0.35" className="animate-pulse-ring" style={{ transformOrigin: `${x}px ${y}px` }} />
            <circle cx={x as number} cy={y as number} r="4" fill={`var(${c as string})`} />
          </g>
        ))}
      </svg>
      <div className="absolute bottom-3 left-3 text-[10px] font-mono text-white/40">LIVE · neighborhood connectedness heatmap</div>
      <div className="absolute top-3 right-3 text-[10px] font-mono text-white/40">51.9023°N · 4.4965°E</div>
    </div>
  );
}
