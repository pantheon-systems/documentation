import { Suspense } from "react";
import { DocsPage } from "@/components/docs-page";
import { SearchProvider } from "@/components/search/search-provider";
import {
  SearchFilters,
  SearchHeader,
  SearchResultsList,
} from "@/components/search/search-ui";

export default function SearchPage() {
  return (
    // useSearchParams needs a Suspense boundary.
    <Suspense>
      <SearchProvider>
        <DocsPage
          activePage="/search"
          sidebar={<SearchFilters />}
          sidebarLabel="Filter results"
          hasBreadcrumb={false}
          header={<SearchHeader />}
        >
          <SearchResultsList />
        </DocsPage>
      </SearchProvider>
    </Suspense>
  );
}
