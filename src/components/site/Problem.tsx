import { TrendingUp, Heart, Building2, Users2 } from "lucide-react";

const stats = [
  { value: "1 in 3", label: "urban residents report chronic loneliness", icon: Users2, tone: "accent" },
  { value: "29%", label: "increased risk of early mortality from social isolation", icon: Heart, tone: "violet" },
  { value: "60%", label: "of public spaces are underused for community life", icon: Building2, tone: "success" },
  { value: "+47%", label: "rise in loneliness among under-30s since 2018", icon: TrendingUp, tone: "accent" },
];

export function Problem() {
  return (
    <section id="problem" className="relative py-28 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">The problem</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">
            Cities were built for density.<br/>
            <span className="text-muted-foreground">Not for connection.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Urban loneliness is now a public-health emergency. Disconnected neighborhoods, weak third places, and fragmented social infrastructure quietly reshape how people live, work, and age in our cities.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="group relative rounded-2xl border border-border bg-card p-6 shadow-elegant hover:-translate-y-1 transition-all duration-300">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-${s.tone === "accent" ? "[color:var(--accent)]" : s.tone === "violet" ? "[color:var(--violet)]" : "[color:var(--success)]"}/15`}>
                  <Icon className={`h-5 w-5 text-[color:var(--${s.tone})]`} />
                </div>
                <div className="mt-5 font-display text-4xl text-foreground">{s.value}</div>
                <div className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.label}</div>
                <div className="absolute inset-x-6 bottom-3 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>
            );
          })}
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-4">
          {[
            { title: "Disconnected neighborhoods", body: "Pockets of the city where residents rarely encounter the same faces twice — silently eroding trust and belonging." },
            { title: "Underused public spaces", body: "Plazas, libraries, and parks designed without rhythms of use — empty when they could be the heart of community life." },
            { title: "Mental health pressure", body: "Loneliness now ranks alongside smoking and obesity as a leading driver of preventable health-system burden." },
          ].map((c, i) => (
            <div key={i} className="rounded-2xl border border-border bg-soft p-7">
              <div className="font-display text-2xl">{c.title}</div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
