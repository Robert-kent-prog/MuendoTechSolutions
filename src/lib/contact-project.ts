export function contactProjectHref({
  service,
  title,
  source,
  budget,
  message,
}: {
  service?: string;
  title?: string;
  source?: string;
  budget?: string;
  message?: string;
}) {
  const params = new URLSearchParams();

  if (service) params.set("service", service);
  if (title) params.set("project", title);
  if (source) params.set("source", source);
  if (budget) params.set("budget", budget);
  if (message) params.set("message", message);

  const query = params.toString();
  return query ? `/contact?${query}` : "/contact";
}
