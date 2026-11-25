import type { ContactPrefill } from "@/components/sections/ContactSection";

export interface ContactProjectInput {
  service?: string;
  title?: string;
  source?: string;
  budget?: string;
  message?: string;
}

export function contactProjectSearch({
  service,
  title,
  source,
  budget,
  message,
}: ContactProjectInput): ContactPrefill {
  const search: ContactPrefill = {};
  if (service) search.service = service;
  if (title) search.project = title;
  if (source) search.source = source;
  if (budget) search.budget = budget;
  if (message) search.message = message;
  return search;
}

export function contactProjectHref(input: ContactProjectInput) {
  const params = new URLSearchParams();
  const search = contactProjectSearch(input);

  if (search.service) params.set("service", search.service);
  if (search.project) params.set("project", search.project);
  if (search.source) params.set("source", search.source);
  if (search.budget) params.set("budget", search.budget);
  if (search.message) params.set("message", search.message);

  const query = params.toString();
  return query ? `/contact?${query}` : "/contact";
}
