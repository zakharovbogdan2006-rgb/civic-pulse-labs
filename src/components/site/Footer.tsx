import { toast } from "sonner";

export function Footer() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = String(fd.get("email") ?? "").trim();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    try {
      const res = await fetch("/api/public/access-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType: "partnership",
          email,
          source: "footer",
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      toast.success("Thanks — we'll be in touch from a Civica address.");
      form.reset();
    } catch {
      toast.error("Couldn't submit — please try again.");
    }
  };
  return (
    <footer className="bg-[oklch(0.1_0.04_255)] text-white/70 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <div className="relative h-7 w-7">
                <div className="absolute inset-0 rounded-md bg-aurora opacity-90" />
                <div className="absolute inset-[3px] rounded-[5px] bg-[oklch(0.1_0.04_255)]" />
                <div className="absolute inset-[6px] rounded-[3px] bg-aurora" />
              </div>
              <span className="font-display text-lg text-white">Civica</span>
            </div>
            <p className="mt-5 font-display text-3xl text-white leading-tight max-w-md">Built for future cities.</p>
            <p className="mt-3 text-sm max-w-md">AI infrastructure for fighting urban loneliness. Helping municipalities reconnect residents with real communities.</p>
          </div>

          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-widest text-white/40 mb-4">Contact</div>
            <div className="space-y-2 text-sm">
              <div>hello@civica.city</div>
              <div>partnerships@civica.city</div>
              <div className="text-white/40">Rotterdam · Den Haag · Amsterdam</div>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="font-display text-xl text-white">Partnership inquiries</div>
            <p className="mt-2 text-sm">For municipalities, innovation programs, and research partners.</p>
            <form className="mt-4 flex gap-2" onSubmit={handleSubmit}>
              <input name="email" type="email" required placeholder="your@city.gov" className="flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30" />
              <button type="submit" className="rounded-full bg-white text-[color:var(--primary)] text-sm font-medium px-4 py-2 hover:bg-white/90">Reach out</button>
            </form>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 text-xs text-white/40">
          <div>© {new Date().getFullYear()} Civica. Built for future cities.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Security</a>
            <a href="#" className="hover:text-white">Research</a>
            <a href="#" className="hover:text-white">Careers</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
