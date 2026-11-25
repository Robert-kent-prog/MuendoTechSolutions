import { useState, useEffect, useRef } from "react";
import { STATS, type StatItemData } from "@/data/stats";

function useCountUp(target: number, duration = 900) {
  const [val, setVal] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId = 0;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            obs.disconnect();
            const start = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              setVal(Math.round(progress * target));
              if (progress < 1) {
                rafId = requestAnimationFrame(tick);
              }
            };
            rafId = requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [target, duration]);

  return { val, ref };
}

function StatItem({ value, suffix, label }: StatItemData) {
  const { val, ref } = useCountUp(value);
  return (
    <div className="glass rounded-2xl p-6 text-center card-hover">
      <div className="text-4xl sm:text-5xl font-bold text-primary">
        <span ref={ref}>{val}</span>
        {suffix}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export function Counters() {
  return (
    <section className="py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <StatItem key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
