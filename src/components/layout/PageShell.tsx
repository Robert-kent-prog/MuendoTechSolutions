import type { ReactNode } from "react";
import { SkipLink } from "@/components/layout/SkipLink";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <SkipLink />
      <Navbar />
      <div id="main-content" className="flex-1">
        {children}
      </div>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
