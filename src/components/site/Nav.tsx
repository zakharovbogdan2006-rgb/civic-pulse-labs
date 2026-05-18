import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AccessDialog } from "./AccessDialog";


export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-6 mt-4">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-background/40 backdrop-blur-xl px-5 py-2.5 shadow-elegant">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative h-7 w-7">
              <div className="absolute inset-0 rounded-md bg-aurora opacity-90" />
              <div className="absolute inset-[3px] rounded-[5px] bg-background" />
              <div className="absolute inset-[6px] rounded-[3px] bg-aurora" />
            </div>
            <span className="font-display text-lg tracking-tight">Civica</span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#platform" className="hover:text-foreground transition">Platform</a>
            <a href="#how" className="hover:text-foreground transition">How it works</a>
            <a href="#demo" className="hover:text-foreground transition">AI Demo</a>
            <a href="#cities" className="hover:text-foreground transition">For Cities</a>
            <a href="#vision" className="hover:text-foreground transition">Vision</a>
          </nav>
          <div className="flex items-center gap-2">
            <AccessDialog
              mode="signin"
              trigger={
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                  Sign in
                </Button>
              }
            />
            <AccessDialog
              mode="register"
              trigger={
                <Button size="sm" className="rounded-full">
                  Request access
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </header>
  );
}
