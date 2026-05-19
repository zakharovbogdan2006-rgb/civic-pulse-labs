import { useState, useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import { Network, Brain, Sigma, MapPin, Workflow, Database, Shield, Calculator } from "lucide-react";


const tabs = [
  { id: "overview", label: "Overview", icon: Network },
  { id: "score", label: "Score calculation", icon: Calculator },
  { id: "graph", label: "Graph structure", icon: Workflow },
  { id: "features", label: "Node features", icon: Database },
  { id: "learning", label: "Learning process", icon: Brain },
  { id: "equation", label: "Core equation", icon: Sigma },
  { id: "output", label: "Spatial output", icon: MapPin },
  { id: "data", label: "Data & GDPR", icon: Shield },
] as const;

const scoreFactors = [
  { name: "Single-person households", weight: 0.22, value: 0.71, contrib: 0.156, source: "CBS" },
  { name: "Social infrastructure density", weight: 0.18, value: 0.34, contrib: 0.061, source: "OSM + municipal GIS" },
  { name: "Walkability & green access", weight: 0.16, value: 0.42, contrib: 0.067, source: "OSM" },
  { name: "Transit connectivity", weight: 0.14, value: 0.55, contrib: 0.077, source: "OV / NS" },
  { name: "Age vulnerability (65+ share)", weight: 0.12, value: 0.48, contrib: 0.058, source: "CBS" },
  { name: "Income & unemployment", weight: 0.10, value: 0.39, contrib: 0.039, source: "CBS" },
  { name: "Self-reported loneliness (GGD)", weight: 0.08, value: 0.62, contrib: 0.050, source: "GGD GHOR" },
];

const dataCategories = [
  {
    title: "Demographic & socioeconomic",
    body: "Age distribution, single-person households, income, unemployment, migration background, population density.",
    sources: "CBS (Statistics Netherlands), municipal open-data portals, neighborhood census datasets.",
  },
  {
    title: "Urban environment & infrastructure",
    body: "Walkability, green space access, land-use diversity, transit & cycling networks, community spaces, pedestrian connectivity.",
    sources: "OpenStreetMap, municipal GIS, Dutch spatial planning & transport network datasets.",
  },
  {
    title: "Mobility & connectivity",
    body: "Commuting flows, pedestrian activity, transit usage, travel times, neighborhood-to-neighborhood connectivity.",
    sources: "Public transport operators, anonymized mobility datasets, traffic sensors, smart-city infrastructure.",
  },
  {
    title: "Social & health indicators",
    body: "Self-reported loneliness, mental wellbeing surveys, social participation, healthcare access, community engagement.",
    sources: "GGD GHOR Netherlands, public health surveys, municipal wellbeing programs.",
  },
  {
    title: "Environment & public space",
    body: "Noise levels, air quality, lighting, park accessibility, public space density.",
    sources: "Environmental monitoring systems, satellite imagery, municipal environmental agencies.",
  },
];

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
            How the <span className="text-gradient">Community Connectedness Index</span> works.
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
                  This produces a <span className="text-foreground">spatial connectedness score</span> — a continuous map of where social
                  infrastructure is strongest and weakest, validated against urban and socioeconomic data.
                </p>
              </div>
              <GraphIllustration />
            </div>
          )}

          {active === "score" && (
            <div>
              <h3 className="font-display text-2xl md:text-3xl">How the score is actually calculated</h3>
              <p className="mt-4 text-muted-foreground max-w-3xl leading-relaxed">
                For each district we build a normalized feature vector (every indicator scaled to 0–1, higher = stronger connectedness signal),
                multiply by a learned weight, sum the contributions, then adjust by the GNN neighbor signal.
                The result is squashed into a 0–100 connectedness score.
              </p>

              <a
                href="#illustrative-note"
                className="mt-5 flex items-start gap-3 rounded-xl border border-[color:var(--warning)]/30 bg-[color:var(--warning)]/5 p-4 text-xs text-muted-foreground hover:bg-[color:var(--warning)]/10 transition"
              >
                <span className="text-[color:var(--warning)] font-mono">*</span>
                <span>
                  <span className="text-foreground">Values marked with * are illustrative examples.</span>{" "}
                  Real scores will be computed from live municipal data (CBS, GGD, RIVM, OSM, NDW). The current
                  inference pipeline uses ChatGPT as a preliminary reasoning engine over public statistics; a
                  dedicated GNN model will be trained on Dutch municipal datasets in the next phase.
                </span>
              </a>

              <div className="mt-6 rounded-2xl border border-border bg-background/50 overflow-hidden">
                <div className="grid grid-cols-12 gap-2 px-5 py-3 text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border">
                  <div className="col-span-5">Indicator</div>
                  <div className="col-span-2 text-right">Weight wᵢ</div>
                  <div className="col-span-2 text-right">Value xᵢ</div>
                  <div className="col-span-3 text-right">wᵢ · xᵢ</div>
                </div>
                {scoreFactors.map((f) => (
                  <div key={f.name} className="grid grid-cols-12 gap-2 px-5 py-3 text-sm border-b border-border/50 last:border-0">
                    <div className="col-span-5">
                      <div className="text-foreground">{f.name}</div>
                      <div className="text-[11px] text-muted-foreground">Source: {f.source}</div>
                    </div>
                    <div className="col-span-2 text-right font-mono text-muted-foreground">{f.weight.toFixed(2)}<span className="text-[color:var(--warning)]">*</span></div>
                    <div className="col-span-2 text-right font-mono text-muted-foreground">{f.value.toFixed(2)}<span className="text-[color:var(--warning)]">*</span></div>
                    <div className="col-span-3 text-right font-mono text-foreground">{f.contrib.toFixed(3)}<span className="text-[color:var(--warning)]">*</span></div>
                  </div>
                ))}
                <div className="grid grid-cols-12 gap-2 px-5 py-3 text-sm bg-background/70">
                  <div className="col-span-9 text-muted-foreground">Σ wᵢ · xᵢ &nbsp;(raw feature score)</div>
                  <div className="col-span-3 text-right font-mono text-foreground">0.508<span className="text-[color:var(--warning)]">*</span></div>
                </div>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-3">
                <div className="rounded-xl border border-border bg-background/50 p-4">
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Step 1 — Features</div>
                  <div className="mt-2 text-sm">Raw score = <span className="font-mono text-foreground">0.508<span className="text-[color:var(--warning)]">*</span></span></div>
                </div>
                <div className="rounded-xl border border-border bg-background/50 p-4">
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Step 2 — GNN neighbors</div>
                  <div className="mt-2 text-sm">+ α · mean(neighbors) = <span className="font-mono text-foreground">+ 0.3 · 0.46 = 0.138<span className="text-[color:var(--warning)]">*</span></span></div>
                </div>
                <div className="rounded-xl border border-border bg-background/50 p-4">
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Step 3 — Squash</div>
                  <div className="mt-2 text-sm">σ(0.646) · 100 ≈ <span className="font-mono text-[color:var(--accent)]">66 / 100<span className="text-[color:var(--warning)]">*</span></span></div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-gradient-to-br from-background/70 to-background/20 p-6">
                <div className="text-sm text-foreground">Worked example — district in Rotterdam-Zuid <span className="text-[color:var(--warning)] font-mono">*</span></div>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  High share of single-person households (0.71<span className="text-[color:var(--warning)]">*</span>) and elevated GGD self-reported loneliness (0.62<span className="text-[color:var(--warning)]">*</span>) push the raw
                  score up. Weak social infrastructure (0.34<span className="text-[color:var(--warning)]">*</span>) adds little offset. Neighboring districts also score moderately high
                  (mean 0.46<span className="text-[color:var(--warning)]">*</span>), so the GNN reinforces the signal. Final connectedness: <span className="text-foreground">66 / 100 — high<span className="text-[color:var(--warning)]">*</span></span>.
                </p>
              </div>

              <div id="illustrative-note" className="mt-8">
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Real benchmarks the model will be calibrated against</div>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    {
                      name: "De Jong Gierveld Loneliness Scale (6-item)",
                      body: "Validated short scale used by CBS & RIVM. Score 0–6, ≥5 = severe loneliness. National baseline: 10.1% severely lonely (CBS 2025).",
                      src: "RIVM · CBS Sociale Samenhang en Welzijn",
                    },
                    {
                      name: "Gezondheidsmonitor Volwassenen & Ouderen",
                      body: "Quadrennial GGD survey covering all 342 Dutch municipalities. Provides neighborhood-level loneliness % (46.2% felt lonely in 2024).",
                      src: "GGD GHOR · CBS · RIVM (2024)",
                    },
                    {
                      name: "OECD How's Life? — Social Connections",
                      body: "Cross-country social-connectedness indicators: support network, time spent with others, trust. Used to validate the spatial output.",
                      src: "OECD WISE (2024)",
                    },
                    {
                      name: "Leefbaarometer (Min. BZK)",
                      body: "Official Dutch neighborhood liveability index — 100+ urban & socioeconomic indicators per buurt. Used as a structural feature baseline.",
                      src: "Ministerie van BZK",
                    },
                  ].map((b) => (
                    <div key={b.name} className="rounded-xl border border-border bg-background/50 p-4">
                      <div className="text-sm text-foreground">{b.name}</div>
                      <div className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{b.body}</div>
                      <div className="mt-2 text-[11px] text-muted-foreground/70">Source: {b.src}</div>
                    </div>
                  ))}
                </div>
              </div>
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
                  A district scores <span className="text-foreground">higher connectedness</span> when it is strongly connected to public spaces,
                  transit hubs, mixed-use social areas, and walkable environments. Isolated, car-dependent areas with weak social
                  infrastructure score <span className="text-foreground">lower connectedness</span>.
                </p>
              </div>
              <ol className="space-y-3">
                {[
                  "Initialize each node with its urban + socioeconomic features",
                  "Aggregate feature vectors from connected neighbors",
                  "Update node representation through the learned transformation",
                  "Repeat for k layers — information propagates k hops across the city",
                  "Map final node representations to a continuous community connectedness score",
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
              <FormulaBlock />


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
                <h3 className="font-display text-2xl md:text-3xl">From embeddings to a spatial connectedness map</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  After training on urban and demographic data, the model produces a continuous{" "}
                  <span className="text-foreground">spatial connectedness score</span> for every district — the estimated strength of social
                  infrastructure across the city.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  City teams use the output to prioritize interventions, target social prescribing, and measure the effect of urban
                  design changes over time.
                </p>
                <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[color:var(--destructive)]" /> weak infra</span>
                  <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[color:var(--warning)]" /> moderate</span>
                  <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[color:var(--success)]" /> strong infra</span>
                </div>
              </div>
              <RiskMapIllustration />
            </div>
          )}

          {active === "data" && (
            <div>
              <h3 className="font-display text-2xl md:text-3xl">Data sources & GDPR compliance</h3>
              <p className="mt-4 text-muted-foreground max-w-3xl leading-relaxed">
                Civica's index for Dutch cities is built exclusively from data provided by{" "}
                <span className="text-foreground">Dutch municipalities</span> and national open-data institutions.
                All inputs are anonymized, aggregated at the neighborhood level, and fully{" "}
                <span className="text-foreground">GDPR-compliant</span>. The system identifies spatial patterns and
                vulnerable areas — never individuals.
              </p>

              <div className="mt-8 grid md:grid-cols-2 gap-3">
                {dataCategories.map((c) => (
                  <div key={c.title} className="rounded-xl border border-border bg-background/50 p-5">
                    <div className="text-sm text-foreground">{c.title}</div>
                    <div className="mt-2 text-xs text-muted-foreground leading-relaxed">{c.body}</div>
                    <div className="mt-3 text-[11px] uppercase tracking-wider text-muted-foreground/70">Sources</div>
                    <div className="mt-1 text-xs text-muted-foreground">{c.sources}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-border bg-gradient-to-br from-background/70 to-background/20 p-6">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Shield className="h-4 w-4 text-[color:var(--accent)]" />
                  Privacy & ethical safeguards
                </div>
                <ul className="mt-3 grid sm:grid-cols-3 gap-3 text-xs text-muted-foreground">
                  <li className="rounded-lg border border-border bg-background/50 p-3">Anonymized at source — no personal identifiers.</li>
                  <li className="rounded-lg border border-border bg-background/50 p-3">Aggregated to neighborhood level — never individual tracking.</li>
                  <li className="rounded-lg border border-border bg-background/50 p-3">Fully GDPR-compliant data handling & retention.</li>
                </ul>
              </div>
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
      <div className="mt-3 text-center text-xs text-muted-foreground">Predicted community connectedness · district grid</div>
    </div>
  );
}

function FormulaBlock() {
  const html = useMemo(
    () =>
      katex.renderToString(
        String.raw`h_v^{(k+1)} = \sigma\!\left( W \sum_{u \in \mathcal{N}(v)} h_u^{(k)} + b \right)`,
        { displayMode: true, throwOnError: false, output: "html" }
      ),
    []
  );
  return (
    <div className="mt-8 rounded-2xl border border-border bg-gradient-to-br from-background/70 to-background/20 p-10 md:p-16 flex items-center justify-center overflow-x-auto">
      <div
        className="text-foreground"
        style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
