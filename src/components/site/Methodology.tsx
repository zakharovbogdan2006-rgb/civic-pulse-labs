import { useState } from "react";
import { Network, Brain, Sigma, MapPin, Workflow, Database } from "lucide-react";

const tabs = [
  { id: "overview", label: "Overview", icon: Network },
  { id: "graph", label: "Graph structure", icon: Workflow },
  { id: "features", label: "Node features", icon: Database },
  { id: "learning", label: "Learning process", icon: Brain },
  { id: "equation", label: "Core equation", icon: Sigma },
  { id: "output", label: "Spatial output", icon: MapPin },
] as const;

type TabId = (typeof tabs)[number]["id"];

const nodeFeatures = [
  "Population density",
  "Walkability",
  "Green space access",
  "Commuting time",
  "Public transport accessibility",
  "Age distribution",
  "Social infrastructure availability",
];

const edgeTypes = [
  { title: "Mobility flows", body: "Aggregated movement between districts from anonymized mobility data." },
  { title: "Transport accessibility", body: "Transit links, frequency and travel time between neighborhoods." },
  { title: "Pedestrian connectivity", body: "Walkable street network continuity across district borders." },
  { title: "Social interaction patterns", body: "Shared third places, markets, schools and community venues." },
];

export function Methodology() {
  const [active, setActive] = useState<TabId>("overview");

  return (
    <section id="methodology" className="relative py-28 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Methodology</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">
            How the <span className="text-gradient">Urban Loneliness Risk Index</span> works.
          </h2>
          <p className="mt-5 text-muted-foreground">
            A Graph Neural Network treats the city as a connected network — districts learn from their neighbors, not in isolation.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActive(t.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                  isActive
                    ? "border-transparent bg-aurora text-white shadow-glow"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div className="rounded-3xl border border-border bg-card p-6 md:p-10 shadow-elegant">
          {active === "overview" && (
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="font-display text-2xl md:text-3xl">A city is a network, not a list.</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Most wellbeing indices score neighborhoods in isolation. Civica's index uses a{" "}
                  <span className="text-foreground">Graph Neural Network (GNN)</span> — a model designed to reason over connected
                  environments. Every district is influenced by what surrounds it: the transit it shares, the streets that bridge it,
                  the people who flow through it.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  This produces a <span className="text-foreground">spatial risk score</span> — a continuous map of where social
                  isolation is most likely to emerge, validated against urban and socioeconomic data.
                </p>
              </div>
              <GraphIllustration />
            </div>
          )}

          {active === "graph" && (
            <div className="grid lg:grid-cols-2 gap-10">
              <div>
                <h3 className="font-display text-2xl md:text-3xl">Nodes and edges</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  <span className="text-foreground">Nodes</span> represent neighborhoods or districts. <span className="text-foreground">Edges</span>{" "}
                  represent the real ties between them — the things that make a city more or less connected.
                </p>
                <div className="mt-6 grid gap-3">
                  {edgeTypes.map((e) => (
                    <div key={e.title} className="rounded-xl border border-border bg-background/50 p-4">
                      <div className="text-sm text-foreground">{e.title}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{e.body}</div>
                    </div>
                  ))}
                </div>
              </div>
              <GraphIllustration />
            </div>
          )}

          {active === "features" && (
            <div>
              <h3 className="font-display text-2xl md:text-3xl">What each node knows about itself</h3>
              <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
                Each district carries a feature vector of urban and socioeconomic indicators. These are the raw signals the model
                combines with its neighbors during training.
              </p>
              <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {nodeFeatures.map((f, i) => (
                  <div key={f} className="flex items-center gap-3 rounded-xl border border-border bg-background/50 p-4">
                    <div className="font-mono text-xs text-muted-foreground w-8">{String(i + 1).padStart(2, "0")}</div>
                    <div className="text-sm">{f}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "learning" && (
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <h3 className="font-display text-2xl md:text-3xl">Message passing</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  At each training step, every neighborhood exchanges information with its connected neighbors. After several rounds,
                  each district's representation reflects not just its own features, but the urban condition of everything it touches.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  A district scores <span className="text-foreground">lower risk</span> when it is strongly connected to public spaces,
                  transit hubs, mixed-use social areas, and walkable environments. Isolated, car-dependent areas with weak social
                  infrastructure score <span className="text-foreground">higher risk</span>.
                </p>
              </div>
              <ol className="space-y-3">
                {[
                  "Initialize each node with its urban + socioeconomic features",
                  "Aggregate feature vectors from connected neighbors",
                  "Update node representation through the learned transformation",
                  "Repeat for k layers — information propagates k hops across the city",
                  "Map final node representations to a continuous loneliness risk score",
                ].map((step, i) => (
                  <li key={i} className="flex gap-4 rounded-xl border border-border bg-background/50 p-4">
                    <div className="font-display text-lg text-[color:var(--accent)] w-6">{i + 1}</div>
                    <div className="text-sm text-muted-foreground">{step}</div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {active === "equation" && (
            <div>
              <h3 className="font-display text-2xl md:text-3xl">Core update equation</h3>
              <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
                Each layer updates a node's representation by aggregating its neighbors and passing the result through a learned
                linear transformation and a non-linear activation.
              </p>
              <div className="mt-8 rounded-2xl border border-border bg-gradient-to-br from-background/60 to-background/20 p-10 md:p-14 flex items-center justify-center overflow-x-auto">
                <math
                  xmlns="http://www.w3.org/1998/Math/MathML"
                  display="block"
                  style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontFamily: "'Cambria Math', 'STIX Two Math', 'Latin Modern Math', Georgia, serif" }}
                >
                  <mrow>
                    <msubsup>
                      <mi>h</mi>
                      <mi>v</mi>
                      <mrow><mo>(</mo><mi>k</mi><mo>+</mo><mn>1</mn><mo>)</mo></mrow>
                    </msubsup>
                    <mo>=</mo>
                    <mi>σ</mi>
                    <mrow>
                      <mo>(</mo>
                      <mi>W</mi>
                      <munder>
                        <mo>∑</mo>
                        <mrow><mi>u</mi><mo>∈</mo><mi>N</mi><mo>(</mo><mi>v</mi><mo>)</mo></mrow>
                      </munder>
                      <msup>
                        <msub><mi>h</mi><mi>u</mi></msub>
                        <mrow><mo>(</mo><mi>k</mi><mo>)</mo></mrow>
                      </msup>
                      <mo>+</mo>
                      <mi>b</mi>
                      <mo>)</mo>
                    </mrow>
                  </mrow>
                </math>
              </div>

              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {[
                  ["hᵥ", "Representation (embedding) of a neighborhood"],
                  ["N(v)", "Set of neighboring connected districts"],
                  ["W, b", "Learned model parameters"],
                  ["σ", "Non-linear activation function"],
                ].map(([sym, desc]) => (
                  <div key={sym} className="flex items-start gap-4 rounded-xl border border-border bg-background/50 p-4">
                    <div className="font-mono text-sm text-[color:var(--accent)] w-12">{sym}</div>
                    <div className="text-sm text-muted-foreground">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "output" && (
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="font-display text-2xl md:text-3xl">From embeddings to a spatial risk map</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  After training on urban and demographic data, the model produces a continuous{" "}
                  <span className="text-foreground">spatial risk score</span> for every district — the estimated likelihood of social
                  isolation and loneliness across the city.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  City teams use the output to prioritize interventions, target social prescribing, and measure the effect of urban
                  design changes over time.
                </p>
                <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[color:var(--success)]" /> low risk</span>
                  <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[color:var(--warning)]" /> moderate</span>
                  <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[color:var(--destructive)]" /> high risk</span>
                </div>
              </div>
              <RiskMapIllustration />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function GraphIllustration() {
  const nodes = [
    { x: 80, y: 70, r: 14, tone: "var(--success)" },
    { x: 180, y: 50, r: 18, tone: "var(--accent)" },
    { x: 280, y: 90, r: 12, tone: "var(--warning)" },
    { x: 120, y: 170, r: 20, tone: "var(--accent)" },
    { x: 230, y: 180, r: 14, tone: "var(--success)" },
    { x: 320, y: 200, r: 16, tone: "var(--destructive)" },
    { x: 60, y: 240, r: 12, tone: "var(--warning)" },
    { x: 200, y: 260, r: 18, tone: "var(--violet)" },
  ];
  const edges: [number, number][] = [
    [0, 1], [1, 2], [0, 3], [1, 3], [2, 4], [3, 4], [4, 5], [3, 6], [6, 7], [4, 7], [5, 7], [1, 4],
  ];
  return (
    <div className="rounded-2xl border border-border bg-background/60 p-4">
      <svg viewBox="0 0 380 300" className="w-full h-auto">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="oklch(0.7 0.05 260)"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.r + 6} fill={`color-mix(in oklab, ${n.tone} 18%, transparent)`} />
            <circle cx={n.x} cy={n.y} r={n.r} fill={`color-mix(in oklab, ${n.tone} 70%, transparent)`} stroke={n.tone} strokeWidth="1.5" />
          </g>
        ))}
      </svg>
      <div className="mt-2 text-center text-xs text-muted-foreground">Districts as nodes · urban connections as edges</div>
    </div>
  );
}

function RiskMapIllustration() {
  const cells = Array.from({ length: 48 }).map((_, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const v = seed / 233280;
    let color = "var(--success)";
    if (v > 0.66) color = "var(--destructive)";
    else if (v > 0.4) color = "var(--warning)";
    return { v, color };
  });
  return (
    <div className="rounded-2xl border border-border bg-background/60 p-4">
      <div className="grid grid-cols-8 gap-1">
        {cells.map((c, i) => (
          <div
            key={i}
            className="aspect-square rounded-md"
            style={{ background: `color-mix(in oklab, ${c.color} ${30 + c.v * 60}%, transparent)` }}
          />
        ))}
      </div>
      <div className="mt-3 text-center text-xs text-muted-foreground">Predicted spatial loneliness risk · district grid</div>
    </div>
  );
}
