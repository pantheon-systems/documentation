import React from "react";
import Layout from "@/components/layout";
import { OmniSidebarNav } from "@/components/omniSideBarNav";
import { getOmniItems } from "@/components/omni-components";
import { getOmniSidebarActiveSection } from "@/components/omni-components/helpers";
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
  header,
  hasTOC = false,
  children,
}: {
  activePage: string;
  header?: React.ReactNode;
  hasTOC?: boolean;
  children: React.ReactNode;
}) => {
  // Only render the sidebar for pages that belong to a section. An empty
  // sidebar would still reserve a blank column.
  const section = getOmniSidebarActiveSection(activePage, await getOmniItems());

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
          {header}
        </div>
        <main id="docs-main" tabIndex={-1}>
          <div id="docs-content">{children}</div>
        </main>
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
