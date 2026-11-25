import React from "react";
import Layout from "@/components/layout";
import { OmniSidebarNav } from "@/components/omniSideBarNav";
import { getOmniItems } from "@/components/omni-components";
import {
  getOmniBreadcrumbs,
  getOmniSidebarActiveSection,
} from "@/components/omni-components/helpers";
import { PageBreadcrumbs } from "@/components/common/page-breadcrumbs";
import SearchBar from "@/components/header/search-bar";
import { DocsLayout, TableOfContents } from "@/components/ui/pds-re-export";

/**
 * The shared shell for docs pages, built on the PDS DocsLayout: section
 * navigation in the sidebar (a collapsible band on mobile), the page header
 * above the content, and an optional table of contents rail on the right.
 *
 * The table of contents reads the headings inside #docs-content. Add the
 * toc-ignore class to a heading to leave it out.
 */
export const DocsPage = async ({
  activePage,
  title,
  header,
  hasTOC = false,
  children,
}: {
  activePage: string;
  /** The page's own title, for the breadcrumb of a page that isn't in the menu. */
  title?: string;
  header?: React.ReactNode;
  hasTOC?: boolean;
  children: React.ReactNode;
}) => {
  // Only render the sidebar for pages that belong to a section. An empty
  // sidebar would still reserve a blank column.
  const omniItems = await getOmniItems();
  const section = getOmniSidebarActiveSection(activePage, omniItems);
  const crumbs = getOmniBreadcrumbs(activePage, omniItems, title);

  return (
    <Layout containerWidth="standard" excludeSearch={true}>
      <DocsLayout hasCollapsibleSidebar sidebarLabel="Section navigation">
        {section && (
          <div slot="sidebar">
            <OmniSidebarNav activePage={activePage} />
          </div>
        )}
        <div slot="header">
          <SearchBar />
          <PageBreadcrumbs crumbs={crumbs} />
          {header}
        </div>
        <div>
          <div id="docs-content">{children}</div>
        </div>
        {hasTOC && (
          <div slot="toc">
            <TableOfContents
              sourceID="docs-content"
              ignoreClass="toc-ignore"
              headingText="On this page"
              showHeading
            />
          </div>
        )}
      </DocsLayout>
    </Layout>
  );
};
