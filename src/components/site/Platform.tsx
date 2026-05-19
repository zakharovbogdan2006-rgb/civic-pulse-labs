import { HeartHandshake, Network, ScanSearch } from "lucide-react";

const layers = [
  {
    tag: "Layer 01 · UK-inspired",
    icon: HeartHandshake,
    title: "AI Social Prescribing",
    body: "A 30-second toolkit for the frontline workers who already see isolated residents every week — librarians, GP receptionists, pharmacy staff, supermarket cashiers. Each interaction produces a 'Sociaal Recept': a warm, specific invitation to a real local activity. No resident is ever profiled, scored, or labelled.",
    bullets: ["Sociaal Recept generator for frontline staff", "Live database of community activities in each wijk", "Anonymous attendance tracking via hosts, not residents", "Closes the gap between municipal programs and actual uptake"],
    tone: "accent",
  },
  {
    tag: "Layer 02 · Rotterdam pilot-tested",
    icon: Network,
    title: "Urban Community Intelligence",
    body: "Analyzes neighborhoods and public infrastructure to surface places that strengthen or weaken social connectedness across the city.",
    bullets: ["Detect socially disconnected districts", "Weak community-infrastructure mapping", "Improve public spaces with evidence", "Encourage repeated face-to-face encounters"],
    tone: "violet",
  },
  {
    tag: "Layer 03 · Interactive demo",
    icon: ScanSearch,
    title: "Neighborhood Analysis AI",
    body: "Upload any street, square, or neighborhood image. Civica validates the image, detects the location, and analyzes its social fabric — producing scores, ratings, and interventions.",
    bullets: ["Image validity & geo-detection", "Loneliness Risk Score (0–100)", "1–5 star urban quality criteria", "Design & event-location recommendations"],
    tone: "success",
  },
];

export function Platform() {
  return (
    <section id="platform" className="relative py-28 bg-soft">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">The platform</div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">Three AI systems.<br/>One civic infrastructure.</h2>
          </div>
          <p className="text-muted-foreground max-w-md">Each layer works on its own — together they form a continuous loop from neighborhood-level insight to individual community connection.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {layers.map((l, i) => {
            const Icon = l.icon;
            return (
              <div key={i} className="group relative rounded-3xl border border-border bg-card p-7 shadow-elegant hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                <div className={`absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[color:var(--${l.tone})] opacity-10 blur-2xl group-hover:opacity-20 transition`} />
                <div className="flex items-center gap-3">
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background`}>
                    <Icon className={`h-5 w-5 text-[color:var(--${l.tone})]`} />
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{l.tag}</div>
                </div>
                <h3 className="mt-6 font-display text-3xl leading-tight">{l.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{l.body}</p>
                <ul className="mt-6 space-y-2.5">
                  {l.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm">
                      <span className={`mt-1.5 h-1.5 w-1.5 rounded-full bg-[color:var(--${l.tone})]`} />
                      <span className="text-foreground/80">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
