import Layout from "@/components/layout";
import { NotFoundSearch } from "@/components/search/not-found-search";
import { Container, VerticalEmptyState } from "@/components/ui/pds-re-export";

// The PDS docs site Not Found prototype: a centered empty state with an
// illustration, a line of copy and a search field.
export default function NotFound() {
  return (
    <Layout>
      <Container width="standard" className="pds-pad-block-4xl">
        <VerticalEmptyState
          heading="Sorry, there’s no page at that URL."
          headingLevel="h1"
          illustration="underConstruction"
          message="Try searching the docs for what you were looking for."
          ctaRegion={<NotFoundSearch />}
        />
      </Container>
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
