import Layout from "@/components/layout";
import { NotFoundSearch } from "@/components/search/not-found-search";
import { VerticalEmptyState } from "@/components/ui/pds-re-export";

// The PDS docs site Not Found recipe: a centered empty state that fills the
// page, with an illustration, a line of copy and a search field.
export default function NotFound() {
  return (
    <Layout>
      <VerticalEmptyState
        fillHeight
        className="pan-docs-not-found"
        heading="Sorry, there’s no page at that URL."
        headingLevel="h1"
        illustration="underConstruction"
        message="Try searching the docs for what you were looking for."
        ctaRegion={<NotFoundSearch />}
      />
    </Layout>
  );
}

export function generateMetadata() {
  return {
    title: "Page not found",
    description:
      "The page might not exist or is temporarily unavailable. Check the URL or return to homepage.",
  };
}
