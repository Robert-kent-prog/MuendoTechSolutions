import { describe, it, expect } from "vitest";
import { contactBriefSchema } from "./contact-schema";

describe("contactBriefSchema", () => {
  it("validates a valid project brief", () => {
    const input = {
      name: "Robert Muendo",
      email: "robert@company.co.ke",
      phone: "+254 793 587 026",
      company: "Muendo Software Labs",
      service: "Business System",
      budget: "KES 150,000 – 400,000",
      message: "We need a custom inventory management system for our retail shop.",
    };

    const result = contactBriefSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("fails when name is missing or too short", () => {
    const input = {
      name: "R",
      email: "robert@company.co.ke",
      service: "Business System",
      message: "Valid long message describing the project needs.",
    };

    const result = contactBriefSchema.safeParse(input);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("at least 2 characters");
    }
  });

  it("fails when email format is invalid", () => {
    const input = {
      name: "Robert Kent",
      email: "invalid-email",
      service: "Business System",
      message: "Valid long message describing the project needs.",
    };

    const result = contactBriefSchema.safeParse(input);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("valid email address");
    }
  });

  it("fails when service is not selected", () => {
    const input = {
      name: "Robert Kent",
      email: "robert@company.co.ke",
      service: "",
      message: "Valid long message describing the project needs.",
    };

    const result = contactBriefSchema.safeParse(input);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("select a service");
    }
  });

  it("fails when message is shorter than 10 characters", () => {
    const input = {
      name: "Robert Kent",
      email: "robert@company.co.ke",
      service: "Business System",
      message: "Short",
    };

    const result = contactBriefSchema.safeParse(input);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("at least 10 characters");
    }
  });
});
