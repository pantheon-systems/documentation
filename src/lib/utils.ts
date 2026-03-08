import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const isExternalLink = (url: string) => {
  // Empty URLs
  if (!url) {
    return false;
  }

  // Internal link patterns
  if (
    url.startsWith("/") || // Absolute paths
    url.startsWith("#") || // Hash fragments
    url.startsWith("?") || // Query parameters
    url.startsWith("./") || // Relative paths
    url.startsWith("../") // Parent directory paths
  ) {
    return false;
  }

  // Check for domain-like patterns without scheme (e.g., "example.com/path")
  // This matches strings that contain a dot but don't start with a dot
  if (url.includes(".") && !url.startsWith(".")) {
    // Check if it has a protocol already
    if (!url.includes("://")) {
      // Looks like a domain without scheme, treat as external
      return true;
    }
  }

  // For URLs that might be absolute with protocols
  try {
    // Get the current domain (fallback to central.pantheon.io)
    const currentHost =
      typeof window !== "undefined"
        ? window.location.host
        : "docs.content.pantheon.io";

    // Use URL constructor to parse the URL
    // If URL is relative without leading ./ or ../, this will throw
    const urlObj = new URL(
      url,
      typeof window !== "undefined"
        ? window.location.href
        : "https://docs.content.pantheon.io"
    );

    // Compare domains
    return urlObj.host !== currentHost;
  } catch {
    // Suppress URL parsing errors.
    return false;
  }
};
