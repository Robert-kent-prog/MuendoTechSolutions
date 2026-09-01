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
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* Super Amazing Vector Emblem Mark */}
      <div className="relative size-9 sm:size-10 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-accent/90 p-[1.5px] shadow-md shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
        <div className="size-full rounded-[10px] bg-background/95 backdrop-blur-md flex items-center justify-center overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
          <svg
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-6 text-foreground relative z-10"
          >
            {/* Tech Nodes & Interlocking M Monogram */}
            <path
              d="M7 27V9L18 20L29 9V27"
              stroke="url(#logo-grad-1)"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 27V16.5L18 22L24 16.5V27"
              stroke="url(#logo-grad-2)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />
            <circle cx="7" cy="9" r="2.2" fill="#38BDF8" />
            <circle cx="29" cy="9" r="2.2" fill="#10B981" />
            <circle cx="18" cy="20" r="2" fill="#60A5FA" />
            <defs>
              <linearGradient id="logo-grad-1" x1="7" y1="9" x2="29" y2="27" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38BDF8" />
                <stop offset="0.5" stopColor="#2563EB" />
                <stop offset="1" stopColor="#10B981" />
              </linearGradient>
              <linearGradient id="logo-grad-2" x1="12" y1="16.5" x2="24" y2="27" gradientUnits="userSpaceOnUse">
                <stop stopColor="#60A5FA" />
                <stop offset="1" stopColor="#34D399" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Name & Typography */}
      <div className="flex flex-col">
        <span className="text-base sm:text-lg font-bold tracking-tight leading-none text-foreground group-hover:text-primary transition-colors">
          Muendo
        </span>
        <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase text-accent leading-tight mt-0.5">
          Software Labs
        </span>
      </div>
    </div>
  );
}
