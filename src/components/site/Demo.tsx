import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Shield, MapPin, Star, Lightbulb, CalendarHeart, Sparkles, FileCheck2, X } from "lucide-react";
import { toast } from "sonner";

const sampleCriteria = [
  { name: "Walkability", score: 4 },
  { name: "Public gathering", score: 3 },
  { name: "Green spaces", score: 5 },
  { name: "Accessibility", score: 4 },
  { name: "Community infra", score: 3 },
  { name: "Street activity", score: 4 },
  { name: "Safety perception", score: 4 },
  { name: "Social interaction", score: 3 },
  { name: "Public seating", score: 2 },
  { name: "Event potential", score: 5 },
];

type Analysis = {
  summary: string;
  limitations: string;
  criteria: { name: string; score: number; reason: string }[];
  recommendations: string[];
};

export function Demo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploaded, setUploaded] = useState<{ name: string; url: string } | null>(null);
  const [analysisState, setAnalysisState] = useState<"idle" | "loading" | "error">("idle");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const analyse = async (file: File) => {
    setAnalysisState("loading");
    try {
      const imageDataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const response = await fetch("/api/public/analyze-neighborhood", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ imageDataUrl }) });
      if (!response.ok) throw new Error();
      const result = await response.json() as Analysis;
      setAnalysis(result);
      setAnalysisState("idle");
      toast.success("Analysis completed. Review the results before using them in a decision.");
    } catch {
      setAnalysisState("error");
      toast.error("AI analysis is not available on this deployment. The sample below is illustrative only.");
    }
  };

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image (PNG or JPG)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large — 5MB max");
      return;
    }
    const url = URL.createObjectURL(file);
    setUploaded({ name: file.name, url });
    setAnalysis(null);
    void analyse(file);
  };

  const displayedCriteria = analysis?.criteria ?? sampleCriteria;
  const assessmentScore = Math.round(displayedCriteria.reduce((total, item) => total + item.score, 0) / displayedCriteria.length * 20);
  const recommendations = analysis?.recommendations ?? ["Add 14 seating clusters along Pretorialaan", "Convert parking strip into pocket plaza", "Soft lighting on side streets to extend evening use"];

  return (
    <section id="demo" className="relative py-28 bg-hero text-white overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute -bottom-32 right-0 h-[500px] w-[800px] rounded-full bg-aurora opacity-25 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-14">
          <div className="text-xs uppercase tracking-widest text-white/50 mb-4">Interactive demo</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">
            <span className="text-gradient">See your city</span><br/>through Civica's eyes.
          </h2>
          <p className="mt-5 text-white/70">An illustrative Rotterdam-Zuid sample. Upload an image to request a tentative visual assessment when AI analysis is configured.</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[oklch(0.16_0.04_255)]/80 backdrop-blur-xl p-5 md:p-7 shadow-elegant">
          <div className="grid lg:grid-cols-5 gap-5">
            {/* Image + upload */}
            <div className="lg:col-span-2">
              <div
                className="relative rounded-2xl border border-white/10 bg-[oklch(0.13_0.04_255)] overflow-hidden aspect-[4/5]"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFile(e.dataTransfer.files?.[0]);
                }}
              >
                {uploaded ? (
                  <img src={uploaded.url} alt={uploaded.name} className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <NeighborhoodIllustration />
                )}
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--success)]/20 border border-[color:var(--success)]/40 px-2.5 py-1 text-[11px] text-[color:var(--success)]">
                  <Shield className="h-3 w-3" /> {uploaded ? "Upload validated" : "Illustrative sample"}
                </div>
                {uploaded && (
                  <button
                    type="button"
                    onClick={() => {
                      URL.revokeObjectURL(uploaded.url);
                      setUploaded(null);
                    }}
                    className="absolute top-3 right-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/50 border border-white/15 hover:bg-black/70"
                    aria-label="Remove image"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
                <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/10 bg-black/40 backdrop-blur p-3">
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <MapPin className="h-3.5 w-3.5 text-[color:var(--accent)]" />
                    {uploaded ? "Uploaded image" : "Sample location"}
                  </div>
                  <div className="mt-1 text-sm">
                    {uploaded ? uploaded.name : "Pretorialaan · Afrikaanderwijk, Rotterdam"}
                  </div>
                  <div className="mt-1 text-[11px] text-white/40 font-mono">{uploaded ? (analysisState === "loading" ? "Requesting visual assessment…" : analysisState === "error" ? "Analysis unavailable on this deployment" : "Ready for visual assessment") : "Illustrative data — not inferred from an image"}</div>
                </div>
              </div>

              <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="mt-4 w-full rounded-xl border border-dashed border-white/20 bg-white/[0.03] p-5 text-left hover:bg-white/[0.06] transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 group-hover:bg-white/15">
                    {uploaded ? <FileCheck2 className="h-4 w-4 text-[color:var(--success)]" /> : <Upload className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="text-sm">{uploaded ? "Replace image" : "Upload your own neighborhood"}</div>
                    <div className="text-xs text-white/50">PNG, JPG up to 5MB · visual assessment requires server configuration</div>
                  </div>
                </div>
              </button>
            </div>

            {/* Score + ratings */}
            <div className="lg:col-span-3 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-xs uppercase tracking-widest text-white/50">{analysis ? "Visual design assessment" : "Illustrative sample index"}</div>
                  <div className="mt-3 flex items-end gap-3">
                    <div className="font-display text-6xl text-white">{assessmentScore}</div>
                    <div className="pb-2 text-sm text-[color:var(--warning)]">{analysis ? "tentative visual assessment" : "sample only"}</div>
                  </div>
                  <RiskMeter value={assessmentScore} />
                  <div className="mt-3 text-xs text-white/50">{analysis ? analysis.summary : "Illustrative data; no city comparison or trend is claimed."}</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-xs uppercase tracking-widest text-white/50">Connectedness heatmap</div>
                  <HeatmapSVG />
                </div>
              </div>

              {/* Ratings grid */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-xs uppercase tracking-widest text-white/50 mb-4">Urban quality criteria</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6">
                  {displayedCriteria.map((c) => (
                    <div key={c.name} className="flex items-center justify-between text-sm">
                      <span className="text-white/80">{c.name}</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-3.5 w-3.5 ${i < c.score ? "fill-[color:var(--accent)] text-[color:var(--accent)]" : "text-white/15"}`} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="grid sm:grid-cols-2 gap-4">
                <RecCard
                  icon={<Lightbulb className="h-4 w-4" />}
                  title="Urban design improvements"
                  items={recommendations}
                  tone="accent"
                />
                <RecCard
                  icon={<CalendarHeart className="h-4 w-4" />}
                  title="Assessment limitations"
                  items={analysis ? [analysis.limitations] : ["Illustrative sample only", "No uploaded image has been assessed", "Configure the server key to enable analysis"]}
                  tone="violet"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Sparkles className="h-4 w-4 text-[color:var(--accent)]" />
                  {analysis ? "AI-assisted visual assessment · requires human review" : "Illustrative sample data · not generated from an uploaded image"}
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    const report = {
                      generatedAt: new Date().toISOString(),
                      image: uploaded?.name ?? "Rotterdam-Zuid illustrative sample",
                      assessmentScore,
                      analysisStatus: analysis ? "AI visual assessment" : "illustrative sample",
                      summary: analysis?.summary ?? "Illustrative sample — not inferred from an image.",
                      limitations: analysis?.limitations ?? "No AI analysis was requested.",
                      criteria: displayedCriteria,
                      recommendations: {
                        urbanDesign: recommendations,
                      },
                    };
                    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `civica-report-${Date.now()}.json`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                    toast.success("Report exported");
                  }}
                  className="rounded-full bg-white text-[color:var(--primary)] hover:bg-white/90"
                >
                  Export report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RiskMeter({ value }: { value: number }) {
  return (
    <div className="mt-3 h-2 w-full rounded-full bg-white/10 overflow-hidden">
      <div className="h-full rounded-full bg-gradient-to-r from-[color:var(--destructive)] via-[color:var(--warning)] to-[color:var(--success)]" style={{ width: `${value}%` }} />
    </div>
  );
}

function RecCard({ icon, title, items, tone }: { icon: React.ReactNode; title: string; items: string[]; tone: "accent" | "violet" }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className={`inline-flex items-center gap-2 text-xs text-[color:var(--${tone})]`}>{icon}{title}</div>
      <ul className="mt-4 space-y-2.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-white/80">
            <span className={`mt-1.5 h-1.5 w-1.5 rounded-full bg-[color:var(--${tone})]`} />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function NeighborhoodIllustration() {
  return (
    <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="oklch(0.3 0.07 260)" />
          <stop offset="1" stopColor="oklch(0.18 0.05 255)" />
        </linearGradient>
        <linearGradient id="bldg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="oklch(0.4 0.04 250)" />
          <stop offset="1" stopColor="oklch(0.2 0.04 255)" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill="url(#sky)" />
      {/* street */}
      <rect x="0" y="380" width="400" height="120" fill="oklch(0.15 0.03 255)" />
      <line x1="0" y1="440" x2="400" y2="440" stroke="oklch(0.5 0.06 260)" strokeWidth="1" strokeDasharray="12 12" opacity="0.4" />
      {/* buildings */}
      {[
        [10, 200, 70, 180],
        [85, 150, 60, 230],
        [150, 170, 80, 210],
        [235, 130, 65, 250],
        [305, 180, 85, 200],
      ].map(([x, y, w, h], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} fill="url(#bldg)" />
          {/* windows */}
          {Array.from({ length: Math.floor(h / 30) }).map((_, r) =>
            Array.from({ length: Math.floor(w / 18) }).map((_, c) => (
              <rect key={`${r}-${c}`} x={x + 6 + c * 18} y={y + 12 + r * 30} width="10" height="14" fill={Math.random() > 0.5 ? "oklch(0.85 0.1 80)" : "oklch(0.3 0.04 250)"} opacity={Math.random() > 0.3 ? 0.9 : 0.3} />
            ))
          )}
        </g>
      ))}
      {/* trees */}
      {[60, 130, 220, 300, 360].map((x, i) => (
        <g key={i}>
          <rect x={x - 1} y="370" width="2" height="20" fill="oklch(0.25 0.03 60)" />
          <circle cx={x} cy="365" r="14" fill="oklch(0.55 0.13 160)" opacity="0.85" />
        </g>
      ))}
      {/* people dots */}
      {[80, 140, 200, 260, 320].map((x, i) => (
        <circle key={i} cx={x} cy={420 + (i % 2) * 10} r="3" fill="oklch(0.85 0.1 80)" />
      ))}
      {/* scan lines */}
      <line x1="0" y1="250" x2="400" y2="250" stroke="oklch(0.78 0.13 165)" strokeOpacity="0.6" strokeDasharray="4 6" />
      <line x1="0" y1="320" x2="400" y2="320" stroke="oklch(0.7 0.16 295)" strokeOpacity="0.4" strokeDasharray="4 6" />
    </svg>
  );
}

function HeatmapSVG() {
  return (
    <svg viewBox="0 0 320 140" className="mt-3 w-full">
      <defs>
        <radialGradient id="h1"><stop offset="0" stopColor="oklch(0.78 0.13 165)" stopOpacity="0.7"/><stop offset="1" stopColor="oklch(0.78 0.13 165)" stopOpacity="0"/></radialGradient>
        <radialGradient id="h2"><stop offset="0" stopColor="oklch(0.7 0.16 295)" stopOpacity="0.6"/><stop offset="1" stopColor="oklch(0.7 0.16 295)" stopOpacity="0"/></radialGradient>
        <radialGradient id="h3"><stop offset="0" stopColor="oklch(0.78 0.16 70)" stopOpacity="0.6"/><stop offset="1" stopColor="oklch(0.78 0.16 70)" stopOpacity="0"/></radialGradient>
      </defs>
      <rect width="320" height="140" fill="oklch(0.12 0.04 255)" rx="8"/>
      {Array.from({length:6}).map((_,i)=>(
        <line key={i} x1="0" y1={20+i*20} x2="320" y2={20+i*20} stroke="oklch(1 0 0 / 0.05)" />
      ))}
      <circle cx="80" cy="70" r="50" fill="url(#h1)" />
      <circle cx="200" cy="50" r="55" fill="url(#h2)" />
      <circle cx="260" cy="100" r="40" fill="url(#h3)" />
    </svg>
  );
}
