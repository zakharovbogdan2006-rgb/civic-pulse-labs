import { Leaf, Printer, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const waText =
  "Hoi%20%E2%80%94%20een%20warm%20idee%20voor%20jou%3A%20Vrijwilligersfietsenwerkplaats%2C%20zaterdag%2010%3A00%2C%20Spangesekade%2089.%20Vraag%20naar%20Erik.";

const principles = [
  {
    title: "Geen diagnose",
    body: "No resident is ever labelled lonely. The word doesn't appear in any resident-facing message.",
  },
  {
    title: "Geen profilering",
    body: "The worker types in plain text and discards it. Nothing is stored about the resident.",
  },
  {
    title: "Echt menselijk",
    body: "The connector is always a real person the resident already trusts. AI is just the index of what's nearby.",
  },
];

export function Recept() {
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

        {/* Recept card */}
        <div className="mt-16 flex justify-center">
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
            {/* noise overlay */}
            <div
              aria-hidden
              className="noise pointer-events-none absolute inset-0"
              style={{ opacity: 0.04, borderRadius: 16 }}
            />

            <div className="relative">
              {/* Header */}
              <div className="flex items-center gap-2" style={{ color: "var(--primary)" }}>
                <Leaf className="h-3.5 w-3.5" />
                <span
                  className="font-display"
                  style={{ fontSize: 11, letterSpacing: "3px" }}
                >
                  SOCIAAL RECEPT
                </span>
              </div>

              {/* amber rule */}
              <div
                className="mt-3"
                style={{
                  height: 1,
                  background: "var(--accent)",
                  opacity: 0.3,
                }}
              />

              {/* Voor */}
              <div className="mt-5">
                <span className="text-sm text-muted-foreground border-b border-dashed border-muted pb-0.5">
                  Voor:
                </span>
              </div>

              {/* Activity */}
              <div
                className="mt-3 font-display text-foreground"
                style={{ fontSize: 28, lineHeight: 1.1 }}
              >
                Vrijwilligers-fietsenwerkplaats
              </div>

              {/* When / where */}
              <div className="mt-4 text-sm text-muted-foreground leading-relaxed">
                <div>Zaterdag 10:00–14:00</div>
                <div>De Wielewaal, Spangesekade 89</div>
              </div>

              <div className="mt-3 text-sm text-foreground/80">
                Gastheer: vraag naar <span className="font-semibold">Erik</span>
              </div>

              {/* hairline */}
              <div className="mt-5" style={{ height: 1, background: "var(--border)" }} />

              {/* Warm line */}
              <p
                className="mt-5 italic font-display"
                style={{ color: "var(--primary)", fontSize: 18, lineHeight: 1.35 }}
              >
                Erik verwacht je. Tweedehands fietsbel komt goed van pas.
              </p>

              {/* Stamp */}
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
                GEMEENTE<br />ROTTERDAM
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => window.print()}
            className="rounded-full"
          >
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <a
            href={`https://wa.me/?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="rounded-full">
              <MessageCircle className="h-4 w-4" />
              Stuur via WhatsApp
            </Button>
          </a>
        </div>

        {/* Principles */}
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
