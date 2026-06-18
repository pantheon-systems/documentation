import Layout from "@/components/layout";
import { OmniSidebarNav } from "@/components/omniSideBarNav";
import { DocsSidebarLayout } from "@/components/pds-middleware/docs-sidebar-layout";
import { ProcessedFile } from "@/server/processor/mdx";
import SearchBar from "@/components/header/search-bar";
import { MdxWrapper } from "@/components/ui/mdx-wrapper";
import HeaderBody from "@/components/common/header-body";
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

export const TerminusTemplate = ({ terminus }: { terminus: ProcessedFile }) => {
  const items: any[] = []; // todo: add items @aniketbiprojit

  const hasTOC = terminus.frontmatter.showtoc ?? false;

  let image = "/images/" + terminus.frontmatter.image;
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
            slot="guide-menu"
            activePage={terminus.fields.slug ?? ""}
            submenuPathToUse="/terminus"
            fallbackTitle={terminus.frontmatter.title ?? ""}
            fallbackItems={items}
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
                    title={terminus.frontmatter.title ?? ""}
                    subtitle={terminus.frontmatter.subtitle ?? ""}
                    description={terminus.frontmatter.description ?? ""}
                    slug={terminus.fields.slug}
                    contributors={terminus.frontmatter.contributors ?? []}
                    featured={terminus.frontmatter.featuredcontributor ?? false}
                    editPath={terminus.fields.editPath}
                    reviewDate={terminus.frontmatter.reviewed}
                    // isoDate={guide.frontmatter.reviewed}
                  />
                  <MdxWrapper
                    article={{
                      content: terminus.content,
                      contentType: "TEXT_MARKDOWN",
                      id: terminus.id,
                      metadata: { ...(terminus.frontmatter ?? {}) },
                      publishedDate: terminus.frontmatter.published_date,
                      publishingLevel: "PRODUCTION",
                      tags: [],
                      title: terminus.frontmatter.title || "",
                      updatedAt: null,
                      previewActiveUntil: null,
                    }}
                    componentMap={{}}
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
