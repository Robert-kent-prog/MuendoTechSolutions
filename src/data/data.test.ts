import { describe, it, expect } from "vitest";
import { SERVICES, SERVICE_PACKAGES, SERVICE_DETAIL_PAGES, SERVICE_EXTRAS } from "./services";
import { SERVICE_META } from "./services-meta";
import { PROJECTS, PROJECT_CASE_STUDIES } from "./projects";
import { PROJECT_CASE_STUDY_META } from "./projects-meta";
import { INSIGHTS } from "./insights";
import { INSIGHTS_META } from "./insights-meta";
import { FAQS } from "./faqs";
import { TEAM } from "./team";
import { STATS } from "./stats";

describe("Domain Data Contracts Integrity", () => {
  it("ensures all core services have non-empty items and valid titles", () => {
    expect(SERVICES.length).toBeGreaterThan(0);
    expect(SERVICE_PACKAGES.length).toBeGreaterThan(0);
    SERVICES.forEach((service) => {
      expect(service.title).toBeTruthy();
      expect(service.desc).toBeTruthy();
      expect(service.items.length).toBeGreaterThan(0);
    });
  });

  it("ensures all project case studies have matching project entries and complete fields", () => {
    expect(PROJECTS.length).toBeGreaterThan(0);
    expect(PROJECT_CASE_STUDIES.length).toBeGreaterThan(0);
    PROJECT_CASE_STUDIES.forEach((study) => {
      expect(study.slug).toBeTruthy();
      expect(study.title).toBeTruthy();
      expect(study.problem).toBeTruthy();
      expect(study.solution).toBeTruthy();
      expect(study.outcome).toBeTruthy();
      expect(study.metrics.length).toBeGreaterThan(0);
      expect(study.features.length).toBeGreaterThan(0);
    });
  });

  it("ensures all blog insights have valid slugs, articles, and takeaways", () => {
    expect(INSIGHTS.length).toBeGreaterThan(0);
    INSIGHTS.forEach((post) => {
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.excerpt).toBeTruthy();
      expect(post.article.length).toBeGreaterThan(0);
      expect(post.takeaways.length).toBeGreaterThan(0);
    });
  });

  it("ensures lightweight metadata splits stay in exact parity with full data modules", () => {
    expect(SERVICE_META).toEqual(
      SERVICE_DETAIL_PAGES.map(({ slug, title, eyebrow, summary, price }) => ({
        slug,
        title,
        eyebrow,
        summary,
        price,
      })),
    );
    expect(PROJECT_CASE_STUDY_META).toEqual(
      PROJECT_CASE_STUDIES.map(({ slug, title, tag, summary, metrics }) => ({
        slug,
        title,
        tag,
        summary,
        metrics,
      })),
    );
    expect(INSIGHTS_META).toEqual(INSIGHTS.map(({ article: _a, takeaways: _t, ...meta }) => meta));
  });

  it("ensures team members and stats are valid", () => {
    expect(TEAM.length).toBe(3);
    TEAM.forEach((member) => {
      expect(member.name).toBeTruthy();
      expect(member.role).toBeTruthy();
      expect(member.bio).toBeTruthy();
      expect(member.focus.length).toBeGreaterThan(0);
    });

    expect(STATS.length).toBe(4);
  });

  it("ensures every service page has a stack and FAQs", () => {
    SERVICE_DETAIL_PAGES.forEach((page) => {
      const extras = SERVICE_EXTRAS[page.slug];
      expect(extras, page.slug).toBeTruthy();
      expect(extras.stack.length).toBeGreaterThan(0);
      expect(extras.faqs.length).toBeGreaterThan(0);
    });
  });

  it("keeps blog and service slugs unique", () => {
    const blog = INSIGHTS.map((p) => p.slug);
    expect(new Set(blog).size).toBe(blog.length);
    const services = SERVICE_DETAIL_PAGES.map((p) => p.slug);
    expect(new Set(services).size).toBe(services.length);
  });

  it("keeps site copy free of em dashes", () => {
    const text = JSON.stringify([INSIGHTS, SERVICE_DETAIL_PAGES, SERVICE_EXTRAS, FAQS]);
    expect(text.includes("\u2014")).toBe(false);
  });
});
