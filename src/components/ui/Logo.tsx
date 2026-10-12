import { COMPANY } from "@/lib/seo";
import { LOGO_SRC } from "@/data/nav";

interface LogoProps {
  variant?: "vector" | "image";
  className?: string;
}

export function Logo({ variant = "vector", className = "" }: LogoProps) {
  if (variant === "image") {
    return (
      <img
        src={LOGO_SRC}
        alt={`${COMPANY} logo`}
        className={`h-10 w-auto max-w-[190px] rounded-md object-contain bg-white/95 px-1.5 py-1 sm:h-11 sm:max-w-[240px] ${className}`}
      />
    );
  }

  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      <img
        src="/logo-mark.png"
        alt=""
        width={44}
        height={44}
        className="size-10 sm:size-11 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
      />

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className="text-base sm:text-lg font-extrabold tracking-tight leading-none text-foreground group-hover:text-primary transition-colors">
            MUENDO
          </span>
          <span className="size-1.5 rounded-full bg-accent animate-pulse" />
        </div>
        <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase text-muted-foreground group-hover:text-foreground transition-colors leading-tight mt-0.5">
          Software Labs
        </span>
      </div>
    </div>
  );
}
