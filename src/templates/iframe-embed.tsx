import { MdxWrapper } from "@/components/ui/mdx-wrapper";
import { Container } from "@/components/ui/pds-re-export";
import { ProcessedFile } from "@/server/processor/mdx";

export const IframeEmbedTemplate = ({
  iframeEmbed,
}: {
  iframeEmbed: ProcessedFile;
}) => {
  return (
    <main id="docs-main" tabIndex={-1}>
      <Container width="standard" className="pds-spacing-mar-block-start-3xl">
        <article className="pds-spacing-pad-block-end-xl">
          <div id="doc" className="doc changelog__content">
            <div className="pds-spacing-mar-block-start-s pds-spacing-mar-block-end-2xl">
              <MdxWrapper article={iframeEmbed} />
            </div>
          </div>
        </article>
      </Container>
    </main>
  );
};
