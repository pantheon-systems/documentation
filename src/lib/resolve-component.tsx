import { PageDataWithoutComponent, calculateTemplate } from "./page-utils";

export const serveLocal = (search?: { local?: "true" | "false" }) => {
  let useLocal = false;
  if (process.env.SERVE_LOCAL === "false") {
    return false;
  }

  if (process.env.SERVE_LOCAL === "true") {
    return true;
  }

  if (process.env.NODE_ENV === "development") {
    useLocal = true;
    if (search?.local === "false") {
      useLocal = false;
    }
  }

  return useLocal;
};

export const serveLocalAsync = async (
  searchParams?: Promise<{
    local?: "true" | "false";
  }>
) => {
  const search = await searchParams;

  // @todo, don't hard code this to true
  // https://github.com/pantheon-systems/documentation-in-nextjs/issues/84
  return true;
  // return serveLocal(search);
};

export const resolveComponent = async (
  pageData: PageDataWithoutComponent & { relativeFilePath?: string }
): Promise<{ Component: React.ReactNode; template: string }> => {
  switch (pageData.type) {
    case "doc": {
      const template = calculateTemplate(pageData.data.doc, "doc");

      if (template === "doc") {
        const Doc = await import(`@/templates/doc`);
        return {
          Component: <Doc.DocTemplate doc={pageData.data.doc} />,
          template: "doc",
        };
      } else if (template === "terminuspage") {
        const Doc = await import(`@/templates/doc`);
        return {
          Component: <Doc.DocTemplate doc={pageData.data.doc} />,
          template: "doc",
        };
      } else if (template === "video") {
        const Video = await import(`@/templates/guide`);
        return {
          Component: (
            <Video.GuideTemplate
              guide={pageData.data.doc}
              prev={null}
              next={null}
            />
          ),
          template: "video",
        };
      } else {
        const Doc = await import(`@/templates/doc`);
        return {
          Component: <Doc.DocTemplate doc={pageData.data.doc} />,
          template: "doc",
        };
      }
    }

    case "guide": {
      const Guide = await import(`@/templates/guide`);
      return {
        Component: (
          <Guide.GuideTemplate
            guide={pageData.data.guide}
            prev={pageData.data.prev}
            next={pageData.data.next}
          />
        ),
        template: "guide",
      };
    }

    case "terminus-command": {
      const TerminusCommand = await import(`@/templates/terminus-command`);
      return {
        Component: (
          <TerminusCommand.TerminusCommandTemplate
            command={pageData.data}
            slug={pageData.data.slug}
          />
        ),
        template: "terminus-command",
      };
    }

    case "release-note": {
      const ReleaseNote = await import(`@/templates/release-note`);
      return {
        Component: (
          <ReleaseNote.ReleaseNoteTemplate releaseNote={pageData.data} />
        ),
        template: "release-note",
      };
    }

    case "release-note-listing": {
      const ReleaseNoteListing = await import(
        `@/templates/release-note-listing`
      );
      return {
        Component: (
          <ReleaseNoteListing.ReleaseNoteListingTemplate
            pageNumber={pageData.data.pageNumber}
            releaseNotes={pageData.data.releaseNotes}
            categories={pageData.data.categories}
            totalPages={pageData.data.totalPages}
          />
        ),
        template: "release-note-listing",
      };
    }

    case "iframe-embed": {
      const IframeEmbed = await import(`@/templates/iframe-embed`);
      return {
        Component: (
          <IframeEmbed.IframeEmbedTemplate
            iframeEmbed={pageData.data.iframeEmbed}
          />
        ),
        template: "iframe-embed",
      };
    }

    case "landing": {
      const Landing = await import(`@/templates/landing`);
      return {
        Component: <Landing.LandingTemplate topic={pageData.data.landing} />,
        template: "landing",
      };
    }

    default:
      throw new Error(`Unknown page type: ${(pageData as any).type}`);
  }
};
