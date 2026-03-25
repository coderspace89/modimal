export function getStrapiMedia(url) {
  if (url == null) return null;

  // Return the full URL if it's already an absolute path (e.g., from a CDN)
  if (url.startsWith("http") || url.startsWith("//")) return url;

  // Strapi Cloud uses a .media subdomain for assets
  const cloudUrl = process.env.NEXT_PUBLIC_STRAPI_CLOUD_URL;
  const baseUrl = cloudUrl
    ? cloudUrl.replace(".strapiapp.com", ".media.strapiapp.com")
    : "http://localhost:1337";

  // Ensure there is exactly one slash between baseUrl and url
  return `${baseUrl.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
}