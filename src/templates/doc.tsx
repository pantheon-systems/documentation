import { DocsPage } from "@/components/docs-page";
import { ProcessedFile } from "@/server/processor/mdx";
import { MdxWrapper } from "@/components/ui/mdx-wrapper";
import HeaderBody from "@/components/common/header-body";
import NavButtons from "@/components/common/nav-buttons";
import { getOmniItems } from "@/components/omni-components";
import { getOmniTitle } from "@/components/omni-components/helpers";
import type { AdjacentPage } from "@/lib/page-utils";

export const DocTemplate = async ({
  doc,
  prev,
  next,
  tocDefault = true,
}: {
  doc: ProcessedFile;
  prev?: AdjacentPage | null;
  next?: AdjacentPage | null;
  tocDefault?: boolean;
}) => {
  // Use props if provided, otherwise fall back to frontmatter. Frontmatter links
  // (the certification study guides) carry no title, so ask the omni list.
  const omniItems = await getOmniItems();
  const toPagerLink = (
    page: AdjacentPage | null | undefined,
    frontmatterUrl: string | undefined,
    fallbackTitle: string,
  ) => {
    const url = page?.fields.slug ?? frontmatterUrl;
    if (!url) return null;
    return {
      url,
      title: page?.title || getOmniTitle(url, omniItems) || fallbackTitle,
    };
  };
  const prevLink = toPagerLink(
    prev,
    doc.frontmatter.previousurl,
    "Previous page",
  );
  const nextLink = toPagerLink(next, doc.frontmatter.nexturl, "Next page");

  // Use frontmatter if set, otherwise use the default for this content type
  const hasTOC = doc.frontmatter.showtoc ?? tocDefault;

  return (
    <DocsPage
      isArticle
      activePage={doc.fields.slug}
      title={doc.frontmatter.title}
      hasTOC={hasTOC}
      pager={
        (prevLink || nextLink) && <NavButtons prev={prevLink} next={nextLink} />
      }
      header={
        <HeaderBody
          title={doc.frontmatter.title ?? ""}
          subtitle={doc.frontmatter.subtitle ?? ""}
          description={doc.frontmatter.description ?? ""}
          slug={doc.fields.slug}
          contributors={doc.frontmatter.contributors ?? []}
          featured={doc.frontmatter.featuredcontributor ?? false}
          editPath={doc.fields.editPath}
          reviewDate={doc.frontmatter.reviewed}
        />
      }
    >
      <article className="doc guide-doc-body pds-pad-block-end-2xl">
        <div className="pds-prose">
          <MdxWrapper article={{ content: doc.content }} componentMap={{}} />
        </div>
      </article>
    </DocsPage>
  );
};
