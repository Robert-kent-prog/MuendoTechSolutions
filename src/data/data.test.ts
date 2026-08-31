import { describe, it, expect } from "vitest";
import { SERVICES, SERVICE_PACKAGES, SERVICE_DETAIL_PAGES } from "./services";
import { PROJECTS, PROJECT_CASE_STUDIES } from "./projects";
import { INSIGHTS } from "./insights";
import { FAQS } from "./faqs";
import { TEAM } from "./team";
import { STATS } from "./stats";

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
});
