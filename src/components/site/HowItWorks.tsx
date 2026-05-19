import { Upload, Brain, Sparkles } from "lucide-react";

const steps = [
  { n: "01", icon: Upload, title: "Upload a neighborhood", body: "Drop a screenshot, photo, or satellite view of any street, square, or district. Civica's validator confirms it's a real, analyzable location." },
  { n: "02", icon: Brain, title: "AI analyzes the urban fabric", body: "Walkability, third places, green space, safety perception, social interaction potential — each scored against research-backed wellbeing criteria." },
  { n: "03", icon: Sparkles, title: "Receive interventions", body: "Get a Community Connectedness Index, urban-design recommendations, underused-space opportunities, and the best locations to host community events." },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-28 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-14">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">How it works</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">From image to intervention<br/>in under a minute.</h2>
        </div>

        <div className="relative grid md:grid-cols-3 gap-5">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="relative rounded-2xl border border-border bg-card p-7 shadow-elegant">
                <div className="flex items-center justify-between">
                  <div className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-aurora text-white shadow-glow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="font-display text-5xl text-muted-foreground/30">{s.n}</div>
                </div>
                <h3 className="mt-6 font-display text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
