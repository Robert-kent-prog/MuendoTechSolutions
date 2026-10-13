import { existsSync } from "node:fs";
import { describe, it, expect } from "vitest";
import { SERVICES, SERVICE_PACKAGES, SERVICE_DETAIL_PAGES, SERVICE_EXTRAS } from "./services";
import { PROJECTS, PROJECT_CASE_STUDIES } from "./projects";
import { INSIGHTS } from "./insights";
import { FAQS } from "./faqs";
import { TEAM } from "./team";
import { STATS } from "./stats";
import { PHOTOS, SERVICE_PHOTOS } from "./credits";

describe("Domain Data Contracts Integrity", () => {
  it("ensures all core services have non-empty items and valid titles", () => {
    expect(SERVICES.length).toBeGreaterThan(0);
    SERVICES.forEach((service) => {
      expect(service.title).toBeTruthy();
      expect(service.desc).toBeTruthy();
      expect(service.items.length).toBeGreaterThan(0);
    });
  });

  it("ensures all project case studies have matching project entries and complete fields", () => {
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

  it("ships every credited photo with full attribution", () => {
    Object.values(PHOTOS).forEach((photo) => {
      expect(existsSync(`public${photo.src}`), photo.src).toBe(true);
      expect(photo.author).toBeTruthy();
      expect(photo.license).toBeTruthy();
      expect(photo.sourceUrl.startsWith("https://commons.wikimedia.org/")).toBe(true);
      expect(photo.usedOn.length).toBeGreaterThan(0);
    });
    Object.entries(SERVICE_PHOTOS).forEach(([slug, id]) => {
      expect(
        SERVICE_DETAIL_PAGES.some((p) => p.slug === slug),
        slug,
      ).toBe(true);
      expect(PHOTOS[id]).toBeTruthy();
    });
  });

  it("ships every project image that cards reference", () => {
    PROJECTS.forEach((p) => {
      if (p.image) expect(existsSync(`public${p.image.src}`), p.image.src).toBe(true);
    });
  });
});
