export function useEventContext() {
  const host = window.location.hostname;
  const eventSlug = host.split(".")[0]; // Get the subdomain part

  return {
    slug: eventSlug,
  };
}
