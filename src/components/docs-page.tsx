import React from "react";
import Layout from "@/components/layout";
import { OmniSidebarNav } from "@/components/omniSideBarNav";
import { getOmniItems } from "@/components/omni-components";
import {
  getOmniBreadcrumbs,
  getOmniSidebarActiveSection,
} from "@/components/omni-components/helpers";
import { PageBreadcrumbs } from "@/components/common/page-breadcrumbs";
import {
  ButtonLink,
  DocsLayout,
  TableOfContents,
} from "@/components/ui/pds-re-export";

const helpLinks = [
  {
    icon: "video",
    label: "Ask at Office Hours",
    href: "https://pantheon.io/developers/office-hours?docs",
  },
  {
    icon: "graduationCap",
    label: "Learn Pantheon",
    href: "https://pantheon.io/learn-pantheon?docs",
  },
] as const;

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
  sidebar,
  sidebarLabel = "Section navigation",
  hasBreadcrumb = true,
  isArticle = false,
  children,
}: {
  activePage: string;
  /** The page's own title, for the breadcrumb of a page that isn't in the menu. */
  title?: string;
  header?: React.ReactNode;
  hasTOC?: boolean;
  /** Replaces the section navigation, for a page with its own sidebar (filters). */
  sidebar?: React.ReactNode;
  /** Names the sidebar, and the collapsible band it becomes on mobile. */
  sidebarLabel?: string;
  hasBreadcrumb?: boolean;
  /** An article: header and body are capped at the reading width and centered. */
  isArticle?: boolean;
  children: React.ReactNode;
}) => {
  // Only render the sidebar for pages that belong to a section. An empty
  // sidebar would still reserve a blank column.
  const omniItems = await getOmniItems();
  const section = getOmniSidebarActiveSection(activePage, omniItems);
  const crumbs = getOmniBreadcrumbs(activePage, omniItems, title);

  return (
    <Layout activePage={activePage}>
      <DocsLayout
        hasCollapsibleSidebar
        sidebarLabel={sidebarLabel}
        sidebarToggleLabel={
          sidebar
            ? sidebarLabel
            : section?.header?.label ?? section?.title ?? sidebarLabel
        }
        tocFooterLabel="Help for this page"
      >
        {sidebar ? (
          <div slot="sidebar">{sidebar}</div>
        ) : (
          section && (
            <div slot="sidebar">
              <OmniSidebarNav activePage={activePage} />
            </div>
          )
        )}
        <div slot="header">
          <div
            className={`pan-docs-page-header${
              isArticle ? " pan-docs-article-header" : ""
            }`}
          >
            {hasBreadcrumb && <PageBreadcrumbs crumbs={crumbs} />}
            {header}
          </div>
        </div>
        <div className={isArticle ? "pan-docs-article" : undefined}>
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
        {hasTOC && (
          <div className="pan-docs-rail__help" slot="toc-footer">
            <h2 className="pds-ts-l">Questions about this page?</h2>
            <ul className="pan-docs-rail__links">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <ButtonLink
                    displayType="icon-start"
                    iconName={link.icon}
                    linkContent={<a href={link.href}>{link.label}</a>}
                    size="s"
                    variant="link"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </DocsLayout>
    </Layout>
  );
};
