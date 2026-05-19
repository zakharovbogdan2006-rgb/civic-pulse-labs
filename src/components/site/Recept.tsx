import { useState } from "react";
import { Leaf, Printer, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const waTextNL =
  "Hoi%20%E2%80%94%20een%20warm%20idee%20voor%20jou%3A%20Vrijwilligersfietsenwerkplaats%2C%20zaterdag%2010%3A00%2C%20Spangesekade%2089.%20Vraag%20naar%20Erik.";
const waTextEN =
  "Hi%20%E2%80%94%20a%20warm%20idea%20for%20you%3A%20Volunteer%20bike%20workshop%2C%20Saturday%2010%3A00%2C%20Spangesekade%2089.%20Ask%20for%20Erik.";

const principles = [
  {
    title: "No diagnosis",
    body: "No resident is ever labelled lonely. The word doesn't appear in any resident-facing message.",
  },
  {
    title: "No profiling",
    body: "The worker types in plain text and discards it. Nothing is stored about the resident.",
  },
  {
    title: "Truly human",
    body: "The connector is always a real person the resident already trusts. AI is just the index of what's nearby.",
  },
];

type Lang = "nl" | "en";

const copy: Record<Lang, {
  eyebrow: string;
  for: string;
  activity: string;
  when: string;
  where: string;
  host: (name: string) => React.ReactNode;
  warm: string;
  stamp: React.ReactNode;
}> = {
  nl: {
    eyebrow: "SOCIAAL RECEPT",
    for: "Voor:",
    activity: "Vrijwilligers-fietsenwerkplaats",
    when: "Zaterdag 10:00–14:00",
    where: "De Wielewaal, Spangesekade 89",
    host: (name) => <>Gastheer: vraag naar <span className="font-semibold">{name}</span></>,
    warm: "Erik verwacht je. Tweedehands fietsbel komt goed van pas.",
    stamp: <>GEMEENTE<br />ROTTERDAM</>,
  },
  en: {
    eyebrow: "SOCIAL PRESCRIPTION",
    for: "For:",
    activity: "Volunteer bike workshop",
    when: "Saturday 10:00–14:00",
    where: "De Wielewaal, Spangesekade 89",
    host: (name) => <>Host: ask for <span className="font-semibold">{name}</span></>,
    warm: "Erik is expecting you. A second-hand bike bell will come in handy.",
    stamp: <>CITY OF<br />ROTTERDAM</>,
  },
};

export function Recept() {
  const [lang, setLang] = useState<Lang>("nl");
  const t = copy[lang];
  const waText = lang === "nl" ? waTextNL : waTextEN;

  return (
    <section id="recept" className="relative py-28 bg-soft">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
            The warm invitation
          </div>
          <h2 className="font-display text-4xl md:text-6xl leading-tight">
            One screen. One invitation. 30 seconds.
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl text-lg">
            Sociaal Recept turns the half-second a librarian or pharmacist already has with an
            isolated resident into a specific, dignified invitation to a real community activity
            nearby.
          </p>
        </div>

        {/* Language toggle */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-border bg-card p-1">
            {(["nl", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-4 py-1.5 text-xs uppercase tracking-widest rounded-full transition ${
                  lang === l
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l === "nl" ? "Nederlands" : "English"}
              </button>
            ))}
          </div>
        </div>

        {/* Recept card */}
        <div className="mt-10 flex justify-center">
          <div
            className="recept-print-target relative bg-white text-foreground shadow-elegant"
            style={{
              width: 400,
              maxWidth: "100%",
              padding: 36,
              borderRadius: 16,
              transform: "rotate(-1.5deg)",
            }}
          >
            <div
              aria-hidden
              className="noise pointer-events-none absolute inset-0"
              style={{ opacity: 0.04, borderRadius: 16 }}
            />

            <div className="relative">
              <div className="flex items-center gap-2" style={{ color: "var(--primary)" }}>
                <Leaf className="h-3.5 w-3.5" />
                <span
                  className="font-display"
                  style={{ fontSize: 11, letterSpacing: "3px" }}
                >
                  {t.eyebrow}
                </span>
              </div>

              <div
                className="mt-3"
                style={{ height: 1, background: "var(--accent)", opacity: 0.3 }}
              />

              <div className="mt-5">
                <span className="text-sm text-muted-foreground border-b border-dashed border-muted pb-0.5">
                  {t.for}
                </span>
              </div>

              <div
                className="mt-3 font-display text-foreground"
                style={{ fontSize: 28, lineHeight: 1.1 }}
              >
                {t.activity}
              </div>

              <div className="mt-4 text-sm text-muted-foreground leading-relaxed">
                <div>{t.when}</div>
                <div>{t.where}</div>
              </div>

              <div className="mt-3 text-sm text-foreground/80">{t.host("Erik")}</div>

              <div className="mt-5" style={{ height: 1, background: "var(--border)" }} />

              <p
                className="mt-5 italic font-display"
                style={{ color: "var(--primary)", fontSize: 18, lineHeight: 1.35 }}
              >
                {t.warm}
              </p>

              <div
                aria-hidden
                className="absolute"
                style={{
                  right: -8,
                  bottom: -8,
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  border: "2px solid var(--primary)",
                  color: "var(--primary)",
                  opacity: 0.6,
                  transform: "rotate(-8deg)",
                  fontFamily: "serif",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  fontSize: 9,
                  letterSpacing: "1px",
                  lineHeight: 1.1,
                  fontWeight: 600,
                }}
              >
                {t.stamp}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button variant="outline" onClick={() => window.print()} className="rounded-full">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <a href={`https://wa.me/?text=${waText}`} target="_blank" rel="noopener noreferrer">
            <Button className="rounded-full">
              <MessageCircle className="h-4 w-4" />
              Send via WhatsApp
            </Button>
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-12">
          {principles.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-elegant"
            >
              <div className="font-display text-xl text-foreground">{p.title}</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
