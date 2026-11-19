"use client";

import {
  PantheonProvider,
  useArticle,
  type Article,
} from "@pantheon-systems/cpub-react-sdk";
import {
  ArticleRenderer,
  type ComponentMap,
} from "@pantheon-systems/cpub-react-sdk/components";
import { useMemo } from "react";
import {
  headline2,
  headline3,
  headline4,
} from "@/components/common/release-headlines";
import { getPantheonClient } from "@/lib/content-publisher/PantheonClient";
import { smartComponentMap } from "@/lib/content-publisher/smart-component";

// Match the markdown release note template: the page <h1> is the title, so
// headings inside the body shift down one level and stay out of the TOC.
const componentMap = {
  h1: headline2,
  h2: headline3,
  h3: headline4,
} as ComponentMap;

interface Props {
  article: Article;
  siteId: string;
  pccGrant?: string | null;
  publishingLevel: string;
  versionId?: string | null;
}

function Body({
  article,
  liveUpdates,
  publishingLevel,
  versionId,
}: Omit<Props, "siteId" | "pccGrant"> & { liveUpdates: boolean }) {
  const { data } = useArticle(
    article.id,
    {
      publishingLevel: publishingLevel.toUpperCase() as
        | "PRODUCTION"
        | "REALTIME",
      contentType: "TREE_PANTHEON_V2",
      versionId: versionId ?? undefined,
    },
    { skip: !liveUpdates }
  );

  return (
    <ArticleRenderer
      article={data?.article ?? article}
      smartComponentMap={smartComponentMap}
      componentMap={componentMap}
      __experimentalFlags={{ disableAllStyles: true }}
    />
  );
}

export default function ReleaseNoteBody({
  article,
  siteId,
  pccGrant,
  publishingLevel,
  versionId,
}: Props) {
  // This runs in the browser, where PCC_TOKEN is not available. Only preview
  // links (which carry a grant) refetch the article client-side; published
  // articles render from the server-fetched `article`, so the query is
  // skipped and this placeholder grant is never sent.
  const liveUpdates = Boolean(pccGrant);
  const client = useMemo(
    () => getPantheonClient({ siteId, pccGrant: pccGrant || "unused" }),
    [siteId, pccGrant]
  );

  return (
    <PantheonProvider client={client}>
      <Body
        article={article}
        liveUpdates={liveUpdates}
        publishingLevel={publishingLevel}
        versionId={versionId}
      />
    </PantheonProvider>
  );
}
