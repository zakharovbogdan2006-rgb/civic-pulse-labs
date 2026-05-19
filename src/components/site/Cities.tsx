import { Building2, Map, HeartPulse, Users, Handshake } from "lucide-react";

const benefits = [
  { icon: Building2, title: "City governments", body: "Evidence-based budgets for neighborhoods that need social infrastructure most." },
  { icon: Map, title: "Urban planners", body: "Quantify connectedness before approving every public-realm intervention." },
  { icon: HeartPulse, title: "Public health", body: "Spot wijk-level social infrastructure gaps early — before they translate into clinical demand." },
  { icon: Users, title: "Social workers", body: "Smarter caseload prioritization and personalized community matches." },
  { icon: Handshake, title: "NGOs & community", body: "Reach the residents who would benefit most from your programs." },
];

export function Cities() {
  return (
    <section id="cities" className="relative py-28 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-7">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">For cities</div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">Built with municipalities, <span className="text-muted-foreground">for municipalities.</span></h2>
          </div>
          <p className="lg:col-span-5 text-muted-foreground">Civica fits inside the workflows of city teams already working on wellbeing — from procurement to street-level outreach.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="group rounded-2xl border border-border bg-card p-6 hover:bg-soft transition shadow-elegant">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-aurora/15">
                  <Icon className="h-5 w-5 text-[color:var(--primary)]" />
                </div>
                <div className="mt-5 font-display text-xl">{b.title}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.body}</p>
              </div>
            );
          })}
        </div>

        {/* Testimonial-style strip */}
        <div className="mt-16 rounded-3xl border border-border bg-soft p-10 md:p-14 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-aurora opacity-20 blur-3xl" />
          <div className="relative max-w-3xl">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Pilot insight</div>
            <p className="font-display text-2xl md:text-4xl leading-[1.15]">
              "For the first time, we can see <span className="text-[color:var(--violet)]">which streets our community programs are not reaching</span> — and target outreach to the places where social infrastructure is thinnest."
            </p>
            <div className="mt-6 text-sm text-muted-foreground">— Director of Urban Wellbeing, Northern European pilot city</div>
          </div>
        </div>
      </div>
    </section>
  );
}
