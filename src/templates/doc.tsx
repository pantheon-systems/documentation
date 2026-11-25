import { DocsPage } from "@/components/docs-page";
import { ProcessedFile } from "@/server/processor/mdx";
import { MdxWrapper } from "@/components/ui/mdx-wrapper";
import HeaderBody from "@/components/common/header-body";
import NavButtons from "@/components/common/nav-buttons";

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
    <DocsPage
      activePage={doc.fields.slug}
      title={doc.frontmatter.title}
      hasTOC={hasTOC}
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
        {(prevUrl || nextUrl) && <NavButtons prev={prevUrl} next={nextUrl} />}
      </article>
    </DocsPage>
  );
};
