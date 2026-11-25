import { getOmniItems } from "@/components/omni-components";
import { buildSearchSections } from "@/lib/search-sections";

// The menu changes only when the site is deployed, so this can be cached.
export const revalidate = 3600;

export async function GET() {
  return Response.json(buildSearchSections(await getOmniItems()), {
    headers: {
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
