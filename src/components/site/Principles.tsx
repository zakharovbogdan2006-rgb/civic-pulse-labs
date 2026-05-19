import { ShieldCheck, Heart, Target } from "lucide-react";

const columns = [
  {
    icon: ShieldCheck,
    eyebrow: "Consent",
    accent: "var(--accent)",
    headline: "Opt-in, every time.",
    body:
      "Residents never appear in our system. Only frontline workers, hosts, and the activity database. A worker can write a recept and the resident can decline silently — nothing is recorded either way. No automated decisions, no profiling. Defensible under GDPR Article 22 and EU AI Act Article 5.",
  },
  {
    icon: Heart,
    eyebrow: "Dignity",
    accent: "var(--violet)",
    headline: "No one is ever told they're lonely.",
    body:
      "The word 'eenzaam' does not appear in any resident-facing message — not on the recept, not on the WhatsApp, not on the wall of the library. A recept is an invitation to fix a bike, to walk by the Rotte, to learn Dutch. Connection is the side effect, never the diagnosis.",
  },
  {
    icon: Target,
    eyebrow: "Success",
    accent: "var(--success)",
    headline: "Measured in handshakes, not dashboards.",
    body:
      "We don't optimize for 'loneliness reduction.' We publish four numbers: recepten issued, host-confirmed show-up rate, ULS-8 score on opt-in attendees only, trained frontline staff. If show-up falls below 50%, we audit the activity database — not the residents.",
  },
];

const chips = [
  "No resident profiling",
  "No automated decisions",
  "Aggregated data only",
  "Independent annual audit",
];

export function Principles() {
  return (
    <section id="principles" className="relative overflow-hidden bg-hero text-white py-28">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[1000px] rounded-full bg-aurora opacity-20 blur-3xl" />
      <div className="absolute inset-0 noise opacity-60 mix-blend-overlay" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-widest text-white/50 mb-4">
            Consent. Dignity. Success.
          </div>
          <h2 className="font-display text-4xl md:text-6xl leading-tight">
            How we measure whether this is actually working.
          </h2>
          <p className="mt-5 text-white/70 max-w-2xl text-lg">
            Three principles we hold ourselves to — and the only metrics we publish.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-14">
          {columns.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.eyebrow}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur"
              >
                <div
                  className="inline-flex items-center justify-center rounded-xl"
                  style={{
                    width: 48,
                    height: 48,
                    background: `color-mix(in oklab, ${c.accent} 18%, transparent)`,
                    color: c.accent,
                  }}
                >
                  <Icon size={32} />
                </div>
                <div className="mt-5 text-xs uppercase tracking-widest text-white/50">
                  {c.eyebrow}
                </div>
                <div className="mt-2 font-display text-2xl leading-tight">{c.headline}</div>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{c.body}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-white/10 px-4 py-2 text-xs text-white/80 border border-white/10"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
