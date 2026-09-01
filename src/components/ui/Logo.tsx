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
      {/* Premium Geometric "M" Monogram & Lab Prism Badge */}
      <div className="relative size-10 sm:size-11 shrink-0 rounded-xl bg-slate-950 p-1.5 shadow-lg shadow-primary/20 border border-slate-800/80 transition-all duration-300 group-hover:scale-105 group-hover:border-primary/50 group-hover:shadow-primary/30 overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-4 -right-4 size-12 rounded-full bg-primary/20 blur-md pointer-events-none" />
        <div className="absolute -bottom-4 -left-4 size-12 rounded-full bg-accent/20 blur-md pointer-events-none" />

        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-full relative z-10"
        >
          <defs>
            {/* Gradient Facet 1 - Electric Blue to Cyan */}
            <linearGradient id="msl-blade-left" x1="6" y1="32" x2="20" y2="8" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563EB" />
              <stop offset="1" stopColor="#38BDF8" />
            </linearGradient>
            {/* Gradient Facet 2 - Deep Indigo to Cobalt */}
            <linearGradient id="msl-blade-mid" x1="14" y1="12" x2="26" y2="34" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4F46E5" />
              <stop offset="1" stopColor="#2563EB" />
            </linearGradient>
            {/* Gradient Facet 3 - Cyan to Emerald */}
            <linearGradient id="msl-blade-right" x1="20" y1="8" x2="34" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0EA5E9" />
              <stop offset="1" stopColor="#10B981" />
            </linearGradient>
          </defs>

          {/* Left Wing Facet */}
          <path
            d="M6 31V11.5L15 22L18.5 18L10 8H6V31Z"
            fill="url(#msl-blade-left)"
          />
          {/* Main Chevron "M" Core */}
          <path
            d="M6 10L18.5 24.5L31 10V14.5L18.5 29L6 14.5V10Z"
            fill="url(#msl-blade-mid)"
          />
          {/* Right Ascending Blade */}
          <path
            d="M34 31V11.5L22 25.5L18.5 21L27 9.5H34V31Z"
            fill="url(#msl-blade-right)"
          />

          {/* Precision Nodes */}
          <circle cx="6" cy="10" r="1.8" fill="#38BDF8" />
          <circle cx="34" cy="10" r="1.8" fill="#10B981" />
          <circle cx="18.5" cy="29" r="1.8" fill="#60A5FA" />
        </svg>
      </div>

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
