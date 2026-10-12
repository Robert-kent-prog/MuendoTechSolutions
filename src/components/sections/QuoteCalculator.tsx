import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { QUOTE_ADDONS, QUOTE_SERVICES, TIMELINES, estimateBand } from "@/data/quote";

export function QuoteCalculator() {
  const [serviceId, setServiceId] = useState<string>("");
  const [addons, setAddons] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string>("Flexible");

  const service = QUOTE_SERVICES.find((s) => s.id === serviceId);
  const band = serviceId ? estimateBand(serviceId, addons.length) : null;

  function toggleAddon(id: string) {
    setAddons((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  }

  const message = service
    ? [
        `Project type: ${service.label}`,
        `Rough guide from the quote page: ${band}`,
        "",
        "Business goal:",
        "",
        "Other notes:",
      ].join("\n")
    : "";

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
        <div className="space-y-8">
          <fieldset className="glass rounded-2xl p-6 sm:p-8">
            <legend className="px-2 text-lg font-semibold">1. What are you building?</legend>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {QUOTE_SERVICES.map((s) => {
                const active = s.id === serviceId;
                return (
                  <label
                    key={s.id}
                    className={`cursor-pointer rounded-xl border p-4 transition-colors focus-within:ring-2 focus-within:ring-ring ${
                      active
                        ? "border-primary bg-primary/10"
                        : "border-border hover:bg-secondary/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="service"
                      value={s.id}
                      checked={active}
                      onChange={() => setServiceId(s.id)}
                      className="sr-only"
                    />
                    <span className="block font-medium">{s.label}</span>
                    <span className="mt-1 block text-xs text-muted-foreground leading-relaxed">
                      {s.hint}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="glass rounded-2xl p-6 sm:p-8">
            <legend className="px-2 text-lg font-semibold">2. Anything extra?</legend>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {QUOTE_ADDONS.map((a) => {
                const active = addons.includes(a.id);
                return (
                  <label
                    key={a.id}
                    className={`cursor-pointer flex gap-3 rounded-xl border p-4 transition-colors focus-within:ring-2 focus-within:ring-ring ${
                      active
                        ? "border-primary bg-primary/10"
                        : "border-border hover:bg-secondary/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => toggleAddon(a.id)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 size-5 shrink-0 rounded-md border grid place-items-center ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border"
                      }`}
                    >
                      {active && <Check className="size-3.5" />}
                    </span>
                    <span>
                      <span className="block font-medium">{a.label}</span>
                      <span className="mt-1 block text-xs text-muted-foreground leading-relaxed">
                        {a.hint}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="glass rounded-2xl p-6 sm:p-8">
            <legend className="px-2 text-lg font-semibold">3. When do you need it?</legend>
            <div className="mt-4 flex flex-wrap gap-3">
              {TIMELINES.map((t) => {
                const active = t === timeline;
                return (
                  <label
                    key={t}
                    className={`cursor-pointer rounded-lg border px-4 py-2.5 text-sm transition-colors focus-within:ring-2 focus-within:ring-ring ${
                      active
                        ? "border-primary bg-primary/10"
                        : "border-border hover:bg-secondary/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="timeline"
                      value={t}
                      checked={active}
                      onChange={() => setTimeline(t)}
                      className="sr-only"
                    />
                    {t}
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>

        <aside className="glass rounded-2xl p-6 sm:p-8 lg:sticky lg:top-24" aria-live="polite">
          <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
            Rough guide
          </div>
          {service && band ? (
            <>
              <p className="mt-3 text-2xl font-bold tracking-tight">{band}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                for {service.label.toLowerCase()}
              </p>
              <p className="mt-5 text-xs text-muted-foreground leading-relaxed">
                This is an indicative band, not a quote. The final price depends on your scope and
                is confirmed in writing after a short discovery conversation.
              </p>
              <Link
                to="/contact"
                search={{
                  project: `${service.label} quote request`,
                  service: service.contactService,
                  budget: band,
                  source: "Quote guide",
                  timeline,
                  features: addons.join(","),
                  message,
                }}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Send this as a brief <ArrowRight className="size-4" />
              </Link>
            </>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Choose what you are building and your rough budget band will appear here.
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}
