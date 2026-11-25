import type { ReactNode } from "react";
import { SkipLink } from "@/components/layout/SkipLink";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { BackToTop } from "@/components/ui/BackToTop";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary print:min-h-0 print:block print:bg-white print:text-slate-900">
      <SkipLink />
      <Navbar />
      <div id="main-content" className="flex-1">
        {children}
      </div>
      <Footer />
      <WhatsAppFloat />
      <BackToTop />
    </div>
  );
}
