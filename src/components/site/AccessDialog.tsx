import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

type Mode = "signin" | "register";

export function AccessDialog({
  trigger,
  mode: initialMode = "register",
}: {
  trigger: ReactNode;
  mode?: Mode;
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>(initialMode);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "");
    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setDone(true);
    toast.success(
      mode === "register"
        ? "Request received — our team will reach out shortly."
        : "Magic link sent — check your inbox.",
    );
    setTimeout(() => {
      setOpen(false);
      setTimeout(() => setDone(false), 300);
    }, 1400);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {done ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--success)]/15 text-[color:var(--success)]">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="font-display text-2xl">You're on the list</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We'll be in touch from a Civica address.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">
                {mode === "register" ? "Request platform access" : "Sign in to Civica"}
              </DialogTitle>
              <DialogDescription>
                {mode === "register"
                  ? "Tell us about your city or organization. We onboard partners in cohorts."
                  : "Enter your work email and we'll send you a secure magic link."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" name="firstName" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" name="lastName" required />
                  </div>
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="email">Work email</Label>
                <Input id="email" name="email" type="email" placeholder="you@city.gov" required />
              </div>
              {mode === "register" && (
                <>
                  <div className="space-y-1.5">
                    <Label htmlFor="org">City / organization</Label>
                    <Input id="org" name="org" placeholder="City of Copenhagen" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="note">What would you like to explore?</Label>
                    <Textarea id="note" name="note" rows={3} placeholder="e.g. neighborhood loneliness mapping pilot" />
                  </div>
                </>
              )}
              <DialogFooter className="gap-2 sm:gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setMode(mode === "register" ? "signin" : "register")}
                >
                  {mode === "register" ? "I already have access" : "Request access instead"}
                </Button>
                <Button type="submit" disabled={submitting} className="rounded-full">
                  {submitting
                    ? "Sending…"
                    : mode === "register"
                      ? "Request access"
                      : "Send magic link"}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
