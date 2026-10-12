# Benchmark Report: Tanco Tech Consulting vs Muendo Software Labs

Reviewed 12 October 2026. Source: public pages of https://tancotechconsulting.com viewed as a visitor.
Pages read: home, /studio, /quote, /contact, /service-web, /service-host, /product-spratpos, /portfolio, /insights, /about, /careers, plus the navbar, footer, cookie banner and AI chat widget on the home page.
Not covered: page speed or Lighthouse scores, the individual blog articles, and the other five product pages.

The goal is to borrow useful **functionality and structure**, not copy their design, wording or numbers.

---

## 1. How their site is built

| Area | What they do |
|---|---|
| Platform | WordPress with jQuery, Contact Form 7 and a Google Ads tag. A real backend receives form posts. |
| Navbar | Fixed header. Dropdown "mega menus" for Services, Products and Insights, a plain Pricing link, a Company dropdown, then Contact and a bright "Get a Quote" button. A promo card ("Watch: how we build software") sits inside the Services menu. |
| Hero | One-line announcement pill ("New: AI Blueprint Studio, plan your project in 30s"), two buttons, floating stat cards, a stats row (8 services, 4 hosting plans, 6 products), a logo strip. |
| Footer | Four link columns (Services, Products, Company, Resources), newsletter signup, address and phone, legal row with Privacy, Terms and **Cookie Settings**. |
| Floating UI | AI chat button ("Tan") with suggested questions, a cookie banner (Accept All / Essential Only / Customize), a back-to-top button. |
| Inner pages | Breadcrumbs on every page. |

## 2. Their standout features

1. **Instant Quote Builder (/quote).** Pick services (each with a "from" price), project size (multiplier: small 0.7x, medium 1x, large 1.8x), add-ons, design level, and timeline or support. A live total updates as you click, then "Request This Quote".
2. **AI Blueprint Studio (/studio).** The visitor types an idea and an AI returns features, screens, tech stack, timeline and an investment range. No signup, and example idea chips to start from.
3. **AI chat assistant.** A floating chat with suggested prompts such as "How much does a website cost?" and "I want a quote".
4. **Service page template.** What we deliver (6 cards), what's included (checklist), process (4 steps), tech chips, stat tiles, a short FAQ for that service and two buttons (Get a Quote, Talk to an Expert).
5. **Product pages (SpratPOS).** Why choose it, 9 capabilities, "the difference" checklist, how it works, who it's for, Request a Demo. They sell their own productised software, not only custom work.
6. **Portfolio with filters.** All / Web & Commerce / Mobile / AI & Products tabs, a featured case study, and two metrics on each card.
7. **Insights hub.** Tabs for News, Blog, Guides and Events, a featured report, and a newsletter box. Several articles are cost guides ("Custom Software Development Cost in 2026"), which target buying-intent searches.
8. **Contact page.** Business hours, a "we reply within one business day" promise, an FAQ on the same page, and a link to chat.
9. **Company pages.** About (story, mission, vision, values, team, stats) and Careers (open roles, benefits).
10. **Consent management.** A cookie banner with real choices and a dedicated /cookies page.

## 3. Where Tanco is weak (do not copy)

- **Social proof looks unverifiable.** Generic names, a row of company logos, "120+ projects", "3.2M records/month", "4.8x ROI" with no named clients. Your site's honest case studies and named work are a trust advantage. Keep it that way.
- **Mega menu bug.** The dropdown is semi-transparent, so hero text shows through it and hurts readability. It also opens on click only in my test, not hover.
- **Cookie banner covers the hero** on first load.
- **Emoji in chat copy**, and a heavy WordPress/jQuery stack.
- **Built for the US market:** USD prices, no WhatsApp, no M-Pesa, no local context. This is exactly where Muendo is stronger.

## 4. Where Muendo is already ahead

WhatsApp-first contact, KES budget bands and honest "scoped after discovery" wording, M-Pesa-specific services, 18 Kenya-focused articles, case studies with named tech stacks, structured data on every page type, light and dark themes, skip link and keyboard focus, an HTML plus XML sitemap, and a fast static-style site with no jQuery.

## 5. Recommendations for Muendo

Effort: S = under a day, M = a day or two, L = needs a backend, an account or ongoing cost.

### Tier A: build now (no backend, high value)

| # | Idea | Effort | Why |
|---|---|---|---|
| A1 | **Services dropdown in the navbar** (plus a "Company" group: About, Process, Team, and a "Resources" group: Blog, FAQ, Tech stack). Accessible, opens on click and keyboard, solid background. | M | We now have 11 service pages the nav hides, and the nav is crowded at 1024px. |
| A2 | **Richer quote guide:** add project size, design level and support options, each moving the KES band. Still shows a band, never an exact price. | S | Closest match to their best feature, without inventing prices. |
| A3 | **Per-service FAQ, "what's included" checklist and stat tiles** on service pages, plus **breadcrumbs** with BreadcrumbList schema. | M | Fills thin service pages and adds SEO signals. |
| A4 | **Cost-guide articles for Kenya:** POS system cost, mobile app cost, web app cost, maintenance cost, M-Pesa integration cost. | M | Buying-intent searches; we already have one cost article. |
| A5 | **Footer upgrade:** Services column from the new pages, Resources column (Pricing, Quote, Tech stack, Blog), business hours. | S | Better discovery and trust. |
| A6 | **Contact page extras:** business hours, a response-time promise (only one you will keep), a short FAQ. | S | Lowers hesitation before contacting. |
| A7 | **Portfolio filter tabs** (Web, Mobile, AI, Business systems) and a featured case study. Use only real metrics. | S | Projects page is a long list today. |
| A8 | **Back-to-top button** and an announcement pill on the hero pointing to /quote. | S | Cheap polish and a clearer path to the quote guide. |

### Tier B: valuable, but needs a backend or an account (needs your decision)

| # | Idea | Needs |
|---|---|---|
| B1 | **AI Project Scoper** (their Blueprint Studio): visitor describes an idea, gets features, stack, timeline and a KES band. It also demonstrates your own AI-integration service. | An AI API key, a server route, rate limiting and bot protection, a monthly cost cap. |
| B2 | **AI chat assistant** | Same as B1, plus a knowledge base and a human handover to WhatsApp. |
| B3 | **Newsletter signup** | An email provider (Buttondown, Mailchimp) and a footer form that the security headers allow. |
| B4 | **Discovery-call booking** | Cal.com or similar, plus a security-header change. |
| B5 | **Real form backend** so enquiries are stored and cannot be lost. | An email or database service. |

### Tier C: strategy ideas

- **Productised offers.** Tanco sells its own products. If you have a reusable POS, school or fleet system, a product page for it (like SpratPOS: offline use, M-Pesa, staff roles) could make recurring revenue. Only do this if the codebases are real and reusable.
- **Hosting and care plans.** Tanco sells hosting as a service. You already offer maintenance. A named "Care" plan (monthly updates, backups, uptime checks) could be a clear, repeatable product.
- **Cookie banner:** only needed if we add tracking. A privacy-friendly tool such as Plausible needs none, so skip the banner for now and avoid a hero-covering popup.
- **Careers and Events pages:** skip until you are actually hiring or running events.

## 6. Suggested build order

1. A1 navbar dropdowns, then A5 footer and A6 contact extras (these touch the same layout files).
2. A2 richer quote guide, then A3 service-page FAQ and breadcrumbs.
3. A7 portfolio filters and A8 small polish.
4. A4 cost-guide articles (content, in batches).
5. Decide on Tier B (B1 first), once you have chosen an AI provider and budget.
