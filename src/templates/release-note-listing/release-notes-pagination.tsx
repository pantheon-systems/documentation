"use client";

import { Pagination } from "@/components/ui/pds-re-export";
import { useRouter, useSearchParams } from "next/navigation";

/** The PDS Pagination for the release notes list, keeping the category filter. */
export const ReleaseNotesPagination = ({
  currentPage,
  totalItemCount,
  itemsPerPage,
}: {
  currentPage: number;
  totalItemCount: number;
  itemsPerPage: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalItemCount <= itemsPerPage) return null;

  const goTo = (page: number) => {
    const query = (searchParams?.getAll("category") ?? [])
      .map((slug) => `category=${encodeURIComponent(slug)}`)
      .join("&");
    router.push(`/release-notes/${page}${query ? `?${query}` : ""}`);
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalItemCount={totalItemCount}
      itemsPerPage={itemsPerPage}
      headingText="Release notes pages"
      onPageChange={goTo}
    />
  );
};
