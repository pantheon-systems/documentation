import { Fragment, type ReactNode } from "react";
import Layout from "@/components/layout";
import NavButtons, { type PagerLink } from "@/components/common/nav-buttons";
import { PageBreadcrumbs } from "@/components/common/page-breadcrumbs";
import { RssLink } from "@/components/common/rss-link";
import { Container, Panel } from "@/components/ui/pds-re-export";

export type NoteDetail = { label: string; value: ReactNode };

/**
 * A single release note or tracker entry, from the PDS docs site Release Note
 * recipe: the body in a reading column with a panel of details beside it. Below
 * 64rem the panel drops and `narrowMeta` leads the body, with the RSS link after
 * it (the recipe's narrow layout).
 */
export const NotePage = ({
  activePage,
  parent,
  title,
  details,
  narrowMeta,
  asideLabel,
  rssHref,
  prev,
  next,
  children,
}: {
  /** The page's section, so the header menu marks it. */
  activePage: string;
  parent: { label: string; href: string };
  title: string;
  details: NoteDetail[];
  /** What shows above the body when the details panel is hidden. */
  narrowMeta: ReactNode;
  asideLabel: string;
  rssHref: string;
  prev?: PagerLink | null;
  next?: PagerLink | null;
  children: ReactNode;
}) => (
  <Layout activePage={activePage}>
    <Container width="x-wide">
      <div className="pan-docs-note">
        <div className="pan-docs-page-header">
          <PageBreadcrumbs crumbs={[parent]} />
          <h1 className="pan-docs-page-header__title">{title}</h1>
        </div>
        <div className="pan-docs-note__layout">
          <div>
            <div className="pan-docs-note__meta">{narrowMeta}</div>
            <article id="doc" className="pds-prose pan-docs-note__body">
              {children}
            </article>
            <div className="pan-docs-note__footer">
              <RssLink href={rssHref} />
            </div>
            {(prev || next) && <NavButtons prev={prev} next={next} />}
          </div>
          <aside className="pan-docs-note__aside" aria-label={asideLabel}>
            <Panel padding="condensed">
              <dl className="pan-docs-note__details">
                {details.map(({ label, value }) => (
                  <Fragment key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </Fragment>
                ))}
              </dl>
              <div className="pan-docs-note__subscribe">
                <RssLink href={rssHref} />
              </div>
            </Panel>
          </aside>
        </div>
      </div>
    </Container>
  </Layout>
);
