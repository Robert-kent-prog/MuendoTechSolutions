import { z } from "zod";

export const contactBriefSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name (at least 2 characters)"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().optional(),
  company: z.string().trim().optional(),
  service: z.string().trim().min(1, "Please select a service"),
  budget: z.string().trim().optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please describe your project or requirement (at least 10 characters)")
    .max(2000, "Message cannot exceed 2000 characters"),
});

export type ContactBriefInput = z.infer<typeof contactBriefSchema>;
