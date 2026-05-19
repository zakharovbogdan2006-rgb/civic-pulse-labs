import { jsPDF } from "jspdf";

export function downloadOnePager() {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const M = 18;
  let y = 22;

  // Brand bar
  doc.setFillColor(15, 27, 61);
  doc.rect(0, 0, W, 10, "F");

  // Title
  doc.setTextColor(15, 27, 61);
  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.text("Civica", M, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(90, 90, 90);
  doc.text("AI infrastructure for fighting urban loneliness", M + 22, y);
  y += 10;

  doc.setDrawColor(220, 220, 220);
  doc.line(M, y, W - M, y);
  y += 8;

  const section = (title: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 27, 61);
    doc.text(title.toUpperCase(), M, y);
    y += 5;
  };

  const para = (text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    const lines = doc.splitTextToSize(text, W - M * 2);
    doc.text(lines, M, y);
    y += lines.length * 4.6 + 4;
  };

  const bullets = (items: string[]) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    items.forEach((it) => {
      const lines = doc.splitTextToSize("•  " + it, W - M * 2 - 4);
      doc.text(lines, M + 2, y);
      y += lines.length * 4.6 + 1.5;
    });
    y += 3;
  };

  section("The problem");
  para(
    "1 in 3 Dutch adults reports loneliness. Existing tools either profile residents (unethical, illegal under the EU AI Act) or build chatbot 'friends' (ineffective). Frontline workers — librarians, GPs, pharmacists — already see isolated residents but have no 30-second tool to act."
  );

  section("What Civica does");
  bullets([
    "Maps WHERE social infrastructure is thin at neighborhood level — using public statistics, never resident data.",
    "Gives frontline staff a 30-second 'Sociaal Recept' — a warm, specific invitation to a real local activity hosted by a real person.",
    "Tracks outcomes via host-confirmed attendance, never resident profiling.",
  ]);

  section("Three principles we hold ourselves to");
  bullets([
    "No diagnosis — no resident is ever labelled lonely.",
    "No profiling — worker input is plain text, discarded after use.",
    "Truly human — the connector is always a person the resident already trusts.",
  ]);

  section("Defensible under the EU AI Act");
  para(
    "The Community Connectedness Index scores places (neighborhoods, streets) using public statistics — not natural persons. Not a high-risk system under Annex III. No social scoring under Article 5(1)(c)."
  );

  section("Plan & budget");
  bullets([
    "Months 1–3 · Build platform · pilot in 3 wijken — €350K",
    "Months 4–18 · Sociaal Recept rollout · 500 trained prescribers — €1M",
    "Months 6–18 · Independent ULS-8 evaluation + RCT in one wijk — €400K",
    "Ongoing · Hosting + AI + support · scale once metrics hold — €250K",
  ]);

  section("KPIs over 18 months");
  bullets([
    "15,000 recepten issued across 3 cities",
    "≥ 60% host-confirmed show-up rate",
    "−3 pts mean ULS-8 drop in opt-in cohort",
    "500 trained frontline prescribers",
  ]);

  // Footer
  doc.setDrawColor(220, 220, 220);
  doc.line(M, 285, W - M, 285);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text("Civica · civica.city · €2M · 18 months · 3 cities", M, 290);

  doc.save("civica-1-pager.pdf");
}
