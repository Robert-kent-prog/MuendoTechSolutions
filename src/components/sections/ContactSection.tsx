import { useState, useEffect, type FormEvent } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/SectionHeading";
import { COMPANY, EMAIL, GITHUB, LINKEDIN, WHATSAPP } from "@/lib/seo";
import { WHATSAPP_DISPLAY, EMPTY_CONTACT_PREFILL } from "@/data/nav";

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
        {label}
        {required && " *"}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        inputMode={type === "tel" ? "tel" : type === "email" ? "email" : undefined}
        maxLength={200}
        className="w-full rounded-lg bg-background/50 border border-border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-lg bg-background/50 border border-border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const [prefill, setPrefill] = useState(EMPTY_CONTACT_PREFILL);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service") || "";
    const budget = params.get("budget") || "";
    const project = params.get("project") || "";
    const source = params.get("source") || "";
    const customMessage = params.get("message") || "";

    if (!service && !budget && !project && !source && !customMessage) {
      return;
    }

    const message =
      customMessage ||
      [
        project ? `Project / package: ${project}` : "",
        service ? `Service needed: ${service}` : "",
        source ? `Source page: ${source}` : "",
        "",
        "Business goal:",
        "",
        "Important features:",
        "",
        "Timeline:",
        "",
        "Budget range:",
        "",
        "Other notes:",
      ]
        .filter((line, index, lines) => line || lines[index - 1])
        .join("\n");

    setPrefill({ service, budget, message, project });
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const message = [
      `Hello ${COMPANY}, I have a new project brief.`,
      "",
      `Name: ${f.get("name") || "Not provided"}`,
      `Email: ${f.get("email") || "Not provided"}`,
      `Phone: ${f.get("phone") || "Not provided"}`,
      `Company: ${f.get("company") || "Not provided"}`,
      `Service: ${f.get("service") || "Not selected"}`,
      `Budget: ${f.get("budget") || "Not selected"}`,
      "",
      "Project message:",
      `${f.get("message")}`,
    ].join("\n");
    window.open(
      `https://wa.me/${WHATSAPP.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  }

  const prefillKey = `${prefill.service}|${prefill.budget}|${prefill.project}|${prefill.message}`;

  return (
    <Section
      id="contact"
      eyebrow="Get In Touch"
      title="Let's Discuss Your Project"
      subtitle="Send a short project brief and we'll help you understand the best approach, features, technology stack, timeline, and development direction."
    >
      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <a
            href={`mailto:${EMAIL}`}
            className="glass card-hover rounded-xl p-5 flex items-start gap-4 block"
          >
            <div className="size-10 rounded-lg bg-primary/15 text-primary grid place-items-center">
              <Mail className="size-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Email</div>
              <div className="font-medium break-all">{EMAIL}</div>
            </div>
          </a>
          <a
            href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass card-hover rounded-xl p-5 flex items-start gap-4 block"
          >
            <div className="size-10 rounded-lg bg-accent/15 text-accent grid place-items-center">
              <Phone className="size-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">WhatsApp</div>
              <div className="font-medium">{WHATSAPP_DISPLAY}</div>
            </div>
          </a>
          <a
            href={`https://github.com/${GITHUB}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass card-hover rounded-xl p-5 flex items-start gap-4 block"
          >
            <div className="size-10 rounded-lg bg-secondary text-foreground grid place-items-center">
              <Github className="size-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">GitHub</div>
              <div className="font-medium">{GITHUB}</div>
            </div>
          </a>
          <a
            href={`https://linkedin.com/in/${LINKEDIN}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass card-hover rounded-xl p-5 flex items-start gap-4 block"
          >
            <div className="size-10 rounded-lg bg-secondary text-foreground grid place-items-center">
              <Linkedin className="size-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">LinkedIn</div>
              <div className="font-medium">{LINKEDIN}</div>
            </div>
          </a>
          <div className="glass rounded-xl p-5 flex items-start gap-4">
            <div className="size-10 rounded-lg bg-secondary text-foreground grid place-items-center">
              <MapPin className="size-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Location</div>
              <div className="font-medium">Nairobi, Kenya</div>
            </div>
          </div>
        </div>
        <form
          key={prefillKey}
          onSubmit={onSubmit}
          className="lg:col-span-3 glass rounded-2xl p-6 sm:p-8 space-y-4"
        >
          {prefill.project && (
            <p className="rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-foreground/85">
              We prefilled this brief from <span className="font-medium">{prefill.project}</span>.
              You can edit anything before sending it on WhatsApp.
            </p>
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full Name" name="name" required />
            <Field label="Email Address" name="email" type="email" required />
            <Field label="Phone Number" name="phone" type="tel" />
            <Field label="Company / Organization" name="company" />
            <SelectField
              label="Service Needed"
              name="service"
              options={[
                "Web Application",
                "Business Website",
                "E-commerce Website",
                "Mobile App",
                "Backend / API",
                "Business System",
                "Point of Sale / Retail System",
                "M-Pesa Integration",
                "Website Maintenance",
                "Google Business Profile / Local SEO",
                "Business Email Setup",
                "AI Integration / AI System",
                "Fleet Management System",
                "Document Management System",
                "Database Design",
                "UI/UX & Frontend",
                "Deployment & Maintenance",
                "Other",
              ]}
              defaultValue={prefill.service}
            />
            <SelectField
              label="Project Budget (KES)"
              name="budget"
              options={[
                "Under KES 25,000",
                "KES 25,000 – 100,000",
                "KES 100,000 – 150,000",
                "KES 150,000 – 400,000",
                "KES 400,000 – 1,000,000",
                "KES 1,000,000+",
                "Not sure yet",
              ]}
              defaultValue={prefill.budget}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={5}
              maxLength={2000}
              defaultValue={prefill.message}
              className="w-full rounded-lg bg-background/50 border border-border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Tell us about your project, goals, and timeline..."
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-lg shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Send Project Brief <ArrowRight className="size-4" />
          </button>
          {sent && (
            <p className="text-sm text-accent">
              Opening WhatsApp with your project brief… If nothing happens, message us at{" "}
              {WHATSAPP_DISPLAY}.
            </p>
          )}
        </form>
      </div>
    </Section>
  );
}
