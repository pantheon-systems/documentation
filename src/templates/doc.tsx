import Layout from "@/components/layout";
import { OmniSidebarNav } from "@/components/omniSideBarNav";
import { DocsSidebarLayout } from "@/components/pds-middleware/docs-sidebar-layout";
import { ProcessedFile } from "@/server/processor/mdx";
import SearchBar from "@/components/header/search-bar";
import { MdxWrapper } from "@/components/ui/mdx-wrapper";
import HeaderBody from "@/components/common/header-body";
import NavButtons from "@/components/common/nav-buttons";
import { TOC } from "@/components/common/toc";

const ContainerDiv = ({ children }: { children: React.ReactNode }) => (
  <div className="content-wrapper">{children}</div>
);

const ContentLayoutType = ({
  children,
  hasTOC,
}: {
  children: React.ReactNode;
  hasTOC: boolean;
}) => {
  if (hasTOC) {
    return (
      <DocsSidebarLayout
        mobileMenuMaxWidth={900}
        sidebarLocation="right"
        sidebarWidth="narrow"
        gridGap="narrow"
        sidebarMobileLocation="after"
      >
        {children}
      </DocsSidebarLayout>
    );
  }

  return <ContainerDiv>{children}</ContainerDiv>;
};

export const DocTemplate = ({
  doc,
  prev,
  next,
  tocDefault = true,
}: {
  doc: ProcessedFile;
  prev?: { fields: { slug: string } } | null;
  next?: { fields: { slug: string } } | null;
  tocDefault?: boolean;
}) => {
  // Use props if provided, otherwise fall back to frontmatter
  const prevUrl = prev?.fields.slug ?? doc.frontmatter.previousurl ?? "";
  const nextUrl = next?.fields.slug ?? doc.frontmatter.nexturl ?? "";

  // Use frontmatter if set, otherwise use the default for this content type
  const hasTOC = doc.frontmatter.showtoc ?? tocDefault;

  return (
    <Layout containerWidth="standard" excludeSearch={true}>
      <DocsSidebarLayout
        sidebarWidth="narrow"
        gridGap="narrow"
        sidebarLocation="left"
        mobileMenuMaxWidth={1025}
        className="pds-container pds-container--x-wide"
      >
        <div slot="sidebar" className="guide-sidebar">
          <OmniSidebarNav
            activePage={doc.fields.slug}
          />
        </div>

        <div id="docs-main" slot="content" tabIndex={-1}>
          <ContentLayoutType hasTOC={hasTOC}>
            <div slot="content">
              <SearchBar />
            </div>
            <main id="docs-main" slot="content" tabIndex={-1}>
              <article className="doc guide-doc-body pds-spacing-pad-block-end-2xl">
                <div>
                  <HeaderBody
                    title={doc.frontmatter.title ?? ""}
                    subtitle={doc.frontmatter.subtitle ?? ""}
                    description={doc.frontmatter.description ?? ""}
                    slug={doc.fields.slug}
                    contributors={doc.frontmatter.contributors ?? []}
                    featured={doc.frontmatter.featuredcontributor ?? false}
                    editPath={doc.fields.editPath}
                    reviewDate={doc.frontmatter.reviewed}
                    // isoDate={guide.frontmatter.reviewed}
                  />
                  <MdxWrapper
                    article={{
                      content: doc.content,
                      contentType: "TEXT_MARKDOWN",
                      id: doc.id,
                      metadata: { ...(doc.frontmatter ?? {}) },
                      publishedDate: doc.frontmatter.published_date,
                      publishingLevel: "PRODUCTION",
                      tags: [],
                      title: doc.frontmatter.title || "",
                      updatedAt: null,
                      previewActiveUntil: null,
                    }}
                    componentMap={{}}
                  />
                  {(prevUrl || nextUrl) && (
                    <NavButtons prev={prevUrl} next={nextUrl} />
                  )}
                </div>
              </article>
            </main>
            {hasTOC && (
              <div slot="sidebar" className="sticky-wrapper">
                <TOC title="Contents" />
              </div>
            )}
          </ContentLayoutType>
        </div>
      </DocsSidebarLayout>
    </Layout>
  );
};
