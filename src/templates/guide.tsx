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

export const GuideTemplate = ({
  guide,
  prev,
  next,
}: {
  prev: null | { fields: { slug: string; guide_directory: string } };
  guide: ProcessedFile;
  next: null | { fields: { slug: string; guide_directory: string } };
}) => {
  const hasTOC = guide.frontmatter.showtoc ?? false;

  let image = "/images/" + guide.frontmatter.image;
  if (image === "/images/null") {
    image = "/images/default-thumb-guides.png";
  }

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
            activePage={guide.fields.slug ?? ""}
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
                    title={guide.frontmatter.title ?? ""}
                    subtitle={guide.frontmatter.subtitle ?? ""}
                    description={guide.frontmatter.description ?? ""}
                    slug={guide.fields.slug}
                    contributors={guide.frontmatter.contributors ?? []}
                    featured={guide.frontmatter.featuredcontributor ?? false}
                    editPath={guide.fields.editPath}
                    reviewDate={guide.frontmatter.reviewed}
                    // isoDate={guide.frontmatter.reviewed}
                  />
                  <MdxWrapper
                    article={{
                      content: guide.content,
                      contentType: "TEXT_MARKDOWN",
                      id: guide.id,
                      metadata: { ...(guide.frontmatter ?? {}) },
                      publishedDate: guide.frontmatter.published_date,
                      publishingLevel: "PRODUCTION",
                      tags: [],
                      title: guide.frontmatter.title || "",
                      updatedAt: null,
                      previewActiveUntil: null,
                    }}
                    componentMap={{}}
                  />
                  <NavButtons
                    prev={prev?.fields.slug ?? ""}
                    next={next?.fields.slug ?? ""}
                  />
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
