import { cookies } from "next/headers";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  getArticleBySlugOrId,
  type PublishingLevel,
} from "@pantheon-systems/cpub-sdk-core";
import {
  getPantheonClient,
  getSiteId,
} from "@/lib/content-publisher/PantheonClient";
import Logger from "@/lib/content-publisher/Logger";
import { getSeoMetadata } from "@/lib/content-publisher/utils/seo";
import Link from "next/link";
import Layout from "@/components/layout";
import { Container } from "@/components/ui/pds-re-export";
import PublishedDate from "@/components/common/published-date";
import ReleaseNoteBody from "@/components/content-publisher/release-note-body";
import { getReleaseDateString } from "@/lib/content-publisher/release-note-fields";
import ReleaseNoteCategories from "@/components/content-publisher/release-note-categories";
import { getCategories } from "@/lib/content-publisher/release-note-categories";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    publishingLevel?: string;
    pccGrant?: string;
    versionId?: string;
  }>;
}

async function loadArticle({ params, searchParams }: Props) {
  const { slug } = await params;
  const {
    publishingLevel: _publishingLevel,
    pccGrant,
    versionId: _versionId,
  } = await searchParams;
  const cookieStore = await cookies();

  // A grant (from a preview link or the PCC-GRANT cookie set by the preview
  // API handler) lets non-production versions of an article load.
  const grant = pccGrant || cookieStore.get("PCC-GRANT")?.value || null;
  const versionId = _versionId || undefined;
  const publishingLevel = (_publishingLevel?.toUpperCase() ||
    "PRODUCTION") as PublishingLevel;

  const article = await getArticleBySlugOrId(
    getPantheonClient({ pccGrant: grant }),
    slug,
    {
      publishingLevel,
      contentType: "TREE_PANTHEON_V2",
      versionId,
    },
  );

  return { slug, article, grant, publishingLevel, versionId };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  try {
    const { article } = await loadArticle(props);
    return article ? getSeoMetadata(article) : {};
  } catch (e) {
    Logger.error(e);
    return {};
  }
}

export default async function ReleaseNotePage(props: Props) {
  const { slug, article, grant, publishingLevel, versionId } =
    await loadArticle(props);

  if (!article || !article.resolvedContent) {
    notFound();
  }

  // Redirect to the canonical slug if accessed by ID.
  if (
    article.publishingLevel === "PRODUCTION" &&
    article.slug?.trim().length &&
    article.slug.toLowerCase() !== slug.trim().toLowerCase()
  ) {
    redirect(`/releasenotes/${article.slug.toLowerCase().trim()}`);
  }

  return (
    <Layout containerWidth="standard" excludeSearch={true}>
      <Container width="standard" className="pds-spacing-mar-block-start-3xl">
        <div className="pds-overline-text pds-overline-text--lg pds-spacing-mar-block-end-xs">
          <Link href="/releasenotes" className="pds-spacing-mar-block-end-m">
            Pantheon Release Notes
          </Link>
        </div>
        <h1 className="pds-spacing-mar-block-end-l">{article.title}</h1>

        <ReleaseNoteCategories
          categories={getCategories(article)}
          className="pds-spacing-mar-block-end-xl"
        />

        <article className="pds-spacing-pad-block-end-xl">
          <div id="doc" className="doc changelog__content">
            <div className="pds-spacing-mar-block-start-s pds-spacing-mar-block-end-2xl">
              {getReleaseDateString(article) ? (
                <PublishedDate
                  dateString={getReleaseDateString(article) as string}
                  className="pds-spacing-mar-block-end-m"
                />
              ) : null}
              <ReleaseNoteBody
                article={article}
                siteId={getSiteId()}
                pccGrant={grant}
                publishingLevel={publishingLevel}
                versionId={versionId}
              />
            </div>
          </div>
        </article>
      </Container>
    </Layout>
  );
}
