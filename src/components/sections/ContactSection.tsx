import { useState, useEffect, type FormEvent } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, ArrowRight, Copy, Check, MessageCircle } from "lucide-react";
import { Section } from "@/components/ui/SectionHeading";
import { COMPANY, EMAIL, GITHUB, LINKEDIN, WHATSAPP } from "@/lib/seo";
import { WHATSAPP_DISPLAY, EMPTY_CONTACT_PREFILL } from "@/data/nav";
import { contactBriefSchema, type ContactBriefInput } from "@/lib/validation/contact-schema";

const SERVICE_OPTIONS = [
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
];

const BUDGET_OPTIONS = [
  "Under KES 25,000",
  "KES 25,000 – 100,000",
  "KES 100,000 – 150,000",
  "KES 150,000 – 400,000",
  "KES 400,000 – 1,000,000",
  "KES 1,000,000+",
  "Not sure yet",
];

export function Contact() {
  const [formData, setFormData] = useState<ContactBriefInput>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "whatsapp_sent" | "copied">("idle");
  const [prefillNote, setPrefillNote] = useState<string | null>(null);

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

    setFormData((prev) => ({
      ...prev,
      service: service || prev.service,
      budget: budget || prev.budget,
      message: message || prev.message,
    }));

    if (project) {
      setPrefillNote(project);
    }
  }, []);

  function formatBriefMessage(data: ContactBriefInput) {
    return [
      `Hello ${COMPANY}, I have a new project brief.`,
      "",
      `Name: ${data.name.trim() || "Not provided"}`,
      `Email: ${data.email.trim() || "Not provided"}`,
      `Phone: ${data.phone?.trim() || "Not provided"}`,
      `Company: ${data.company?.trim() || "Not provided"}`,
      `Service: ${data.service.trim() || "Not selected"}`,
      `Budget: ${data.budget?.trim() || "Not selected"}`,
      "",
      "Project message:",
      `${data.message.trim()}`,
    ].join("\n");
  }

  function validate(): boolean {
    const result = contactBriefSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          newErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  }

  function handleWhatsAppSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const formattedMessage = formatBriefMessage(formData);
    window.open(
      `https://wa.me/${WHATSAPP.replace(/\D/g, "")}?text=${encodeURIComponent(formattedMessage)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setStatus("whatsapp_sent");
  }

  function handleCopyAndEmail() {
    if (!validate()) return;

    const formattedMessage = formatBriefMessage(formData);
    navigator.clipboard.writeText(formattedMessage);
    setStatus("copied");

    const mailtoSubject = encodeURIComponent(
      `Project Brief: ${formData.service || "New Project"} - ${formData.name}`,
    );
    const mailtoBody = encodeURIComponent(formattedMessage);

    setTimeout(() => {
      window.location.href = `mailto:${EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;
    }, 500);
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Get In Touch"
      title="Let's Discuss Your Project"
      subtitle="Send a short project brief and we'll help you understand the best approach, features, technology stack, timeline, and development direction."
    >
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Sidebar Info */}
        <div className="lg:col-span-2 space-y-4">
          <a
            href={`mailto:${EMAIL}`}
            className="glass card-hover rounded-xl p-5 flex items-start gap-4 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="size-10 rounded-lg bg-primary/15 text-primary grid place-items-center shrink-0">
              <Mail className="size-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">Email</div>
              <div className="font-medium break-all">{EMAIL}</div>
            </div>
          </a>

          <a
            href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass card-hover rounded-xl p-5 flex items-start gap-4 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="size-10 rounded-lg bg-accent/15 text-accent grid place-items-center shrink-0">
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
            className="glass card-hover rounded-xl p-5 flex items-start gap-4 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="size-10 rounded-lg bg-secondary text-foreground grid place-items-center shrink-0">
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
            className="glass card-hover rounded-xl p-5 flex items-start gap-4 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="size-10 rounded-lg bg-secondary text-foreground grid place-items-center shrink-0">
              <Linkedin className="size-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">LinkedIn</div>
              <div className="font-medium">{LINKEDIN}</div>
            </div>
          </a>

          <div className="glass rounded-xl p-5 flex items-start gap-4">
            <div className="size-10 rounded-lg bg-secondary text-foreground grid place-items-center shrink-0">
              <MapPin className="size-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Location</div>
              <div className="font-medium">Nairobi, Kenya</div>
            </div>
          </div>
        </div>

        {/* Project Brief Form */}
        <form
          onSubmit={handleWhatsAppSubmit}
          noValidate
          className="lg:col-span-3 glass rounded-2xl p-6 sm:p-8 space-y-4"
        >
          {prefillNote && (
            <div className="rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-foreground/85">
              We prefilled this brief from <span className="font-medium">{prefillNote}</span>.
              You can edit anything before dispatching.
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label htmlFor="contact-name" className="block text-xs font-medium text-muted-foreground mb-1.5">
                Full Name <span className="text-destructive">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                maxLength={200}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`w-full rounded-lg bg-background/50 border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                  errors.name ? "border-destructive text-destructive" : "border-border"
                }`}
                placeholder="e.g. Robert Kent"
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-xs text-destructive font-medium">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="contact-email" className="block text-xs font-medium text-muted-foreground mb-1.5">
                Email Address <span className="text-destructive">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                inputMode="email"
                value={formData.email}
                onChange={handleChange}
                maxLength={200}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full rounded-lg bg-background/50 border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                  errors.email ? "border-destructive text-destructive" : "border-border"
                }`}
                placeholder="name@company.co.ke"
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-destructive font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="contact-phone" className="block text-xs font-medium text-muted-foreground mb-1.5">
                Phone Number
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                value={formData.phone}
                onChange={handleChange}
                maxLength={50}
                className="w-full rounded-lg bg-background/50 border border-border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="+254 700 000 000"
              />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="contact-company" className="block text-xs font-medium text-muted-foreground mb-1.5">
                Company / Organization
              </label>
              <input
                id="contact-company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                maxLength={200}
                className="w-full rounded-lg bg-background/50 border border-border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Company Name"
              />
            </div>

            {/* Service */}
            <div>
              <label htmlFor="contact-service" className="block text-xs font-medium text-muted-foreground mb-1.5">
                Service Needed <span className="text-destructive">*</span>
              </label>
              <select
                id="contact-service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                aria-invalid={!!errors.service}
                aria-describedby={errors.service ? "service-error" : undefined}
                className={`w-full rounded-lg bg-background/50 border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                  errors.service ? "border-destructive text-destructive" : "border-border"
                }`}
              >
                <option value="">Select a service…</option>
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p id="service-error" className="mt-1 text-xs text-destructive font-medium">
                  {errors.service}
                </p>
              )}
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="contact-budget" className="block text-xs font-medium text-muted-foreground mb-1.5">
                Project Budget (KES)
              </label>
              <select
                id="contact-budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full rounded-lg bg-background/50 border border-border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select budget range…</option>
                {BUDGET_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="contact-message" className="block text-xs font-medium text-muted-foreground mb-1.5">
              Project Description <span className="text-destructive">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              maxLength={2000}
              value={formData.message}
              onChange={handleChange}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`w-full rounded-lg bg-background/50 border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                errors.message ? "border-destructive text-destructive" : "border-border"
              }`}
              placeholder="Describe your project, goals, key requirements, and expected timeline..."
            />
            {errors.message && (
              <p id="message-error" className="mt-1 text-xs text-destructive font-medium">
                {errors.message}
              </p>
            )}
          </div>

          {/* Dual Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-lg shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <MessageCircle className="size-4" /> Send Brief via WhatsApp
            </button>
            <button
              type="button"
              onClick={handleCopyAndEmail}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-border bg-secondary/50 text-foreground font-medium hover:bg-secondary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {status === "copied" ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
              {status === "copied" ? "Copied to Clipboard!" : "Copy Brief & Email"}
            </button>
          </div>

          {/* Feedback Status Banners */}
          {status === "whatsapp_sent" && (
            <div className="rounded-lg border border-accent/30 bg-accent/10 p-3.5 text-xs text-foreground/90 leading-relaxed">
              🎉 Opening WhatsApp with your formatted brief… If WhatsApp doesn't open automatically, message us directly at <span className="font-semibold">{WHATSAPP_DISPLAY}</span>.
            </div>
          )}

          {status === "copied" && (
            <div className="rounded-lg border border-primary/30 bg-primary/10 p-3.5 text-xs text-foreground/90 leading-relaxed">
              📋 Your brief has been copied to your clipboard and your email application is opening to send to <span className="font-semibold">{EMAIL}</span>.
            </div>
          )}
        </form>
      </div>
    </Section>
  );
}
