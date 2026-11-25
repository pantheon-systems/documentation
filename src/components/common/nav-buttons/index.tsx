"use client";

// A client component, like the header: the links are next/link elements, and
// passing elements from a server component to the PDS client components fails
// during the production prerender. The server passes plain data.
import Link from "next/link";
import { PaginationChapter } from "@/components/ui/pds-re-export";

export type PagerLink = { url: string; title: string };

const toLink = (page: PagerLink | null | undefined, rel: "next" | "prev") =>
  page
    ? { linkContent: <Link href={page.url} rel={rel} />, title: page.title }
    : undefined;

/** Previous and next page links under an article (PDS Pagination Chapter). */
const NavButtons = ({
  prev,
  next,
}: {
  prev?: PagerLink | null;
  next?: PagerLink | null;
}) => (
  <PaginationChapter
    className="pan-docs-article__pager"
    headingText="Previous and next pages"
    next={toLink(next, "next")}
    previous={toLink(prev, "prev")}
  />
);

export default NavButtons;
