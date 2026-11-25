"use client";

// A client component, like the header: the crumbs are Link elements, and passing
// elements from a server component to the PDS client components fails during
// the production prerender. The server passes plain data and the links are
// built here.
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/pds-re-export";
import type { OmniCrumb } from "@/components/omni-components/helpers";

export const PageBreadcrumbs = ({ crumbs }: { crumbs: OmniCrumb[] }) => {
  if (crumbs.length === 0) return null;

  return (
    <Breadcrumb
      className="pds-mar-block-end-m"
      crumbs={[
        <Link key="home" href="/">
          Docs home
        </Link>,
        ...crumbs.map((crumb) => (
          <Link key={crumb.href} href={crumb.href}>
            {crumb.label}
          </Link>
        )),
      ]}
    />
  );
};
