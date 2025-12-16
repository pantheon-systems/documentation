import { CallToAction } from "@/components/common/call-to-action";
import { GuideItem } from "@/components/common/guide-item";
import { IntegrationGuideItem } from "@/components/common/integration-guide-item";
import { SubTopicGroup } from "@/components/common/subtopic-group";
import { Youtube } from "@/components/common/youtube";
import SearchBar from "@/components/header/search-bar";
import Layout from "@/components/layout";
import { OmniSidebarNav } from "@/components/omniSideBarNav";
import { DocsSidebarLayout } from "@/components/pds-middleware/docs-sidebar-layout";
import { Container, LinksCard } from "@/components/ui/pds-re-export";
import Link from "next/link";
import React from "react";

export interface Link {
  text: string;
  url: string;
  icon?: string;
  image?: string;
  icons?: string;
}

export interface CTA {
  type?: string;
  title: string;
  subtitle: string;
  url: string;
}

export interface TopicsGroup {
  title: string;
  subtitle: string;
  links: Link[];
}

export interface SubtopicList {
  title: string;
  links: Link[];
}

export interface Subtopic {
  title: string;
  subtitle: string;
  subtopic_lists: SubtopicList[];
}

export interface Guide {
  title: string;
  type: string;
  links: Link[];
}

export interface Landing {
  title: string;
  subtitle: string;
  path: string;
  video_id?: string;
  cta?: CTA;
  cta_alt?: CTA;
  topics_groups?: TopicsGroup[];
  subtopics?: Subtopic[];
  guides?: Guide[];
  footer_border?: boolean;
}

export type Landings = Landing[];
const containerWidth = "full";

const twoColumnClasses =
  "pds-grid-item pds-grid-item--sm-4 pds-grid-item--md-6 pds-grid-item--lg-6";

const threeColumnClasses =
  "pds-grid-item pds-grid-item--sm-4 pds-grid-item--md-6 pds-grid-item--lg-4";

export const LandingTemplate = ({ topic }: { topic: Landing }) => {
  if (!topic) {
    return null;
  }

  const groupLength = topic.topics_groups ? topic.topics_groups.length : null;
  const topicGroupsColumns =
    groupLength === 2 || groupLength === 4 ? "two" : "three";

  return (
    <Layout containerWidth="standard" excludeSearch={true}>
      <DocsSidebarLayout
        sidebarWidth="narrow"
        gridGap="narrow"
        sidebarLocation="left"
        className="pds-container pds-container--x-wide"
      >
        <div slot="sidebar" className="guide-sidebar">
          <OmniSidebarNav
            slot="guide-menu"
            activePage={topic.path}
            fallbackItems={[]}
            fallbackTitle=""
            submenuPathToUse=""
          />
        </div>
        <main id="docs-main" slot="content" tabIndex={-1}>
          <Container width={containerWidth}>
            <SearchBar />
          </Container>
          <Container width={containerWidth} className="landing-page__header">
            <div className="landing-page-heading pds-spacing-pad-block-m">
              <h1 className="pds-heading-xl text-4xl font-bold pds-spacing-mar-block-end-m">
                {topic.title}
              </h1>
              {topic.subtitle && (
                <div className="pds-lead-text pds-lead-text--sm pds-spacing-mar-block-end-6xs">
                  {topic.subtitle}
                </div>
              )}
            </div>
          </Container>
          {/* Video */}
          {topic.video_id && (
            <div className="landing-page__video-background">
              <Container
                width={"containerWidth"}
                className="video-container pds-spacing-mar-block-start-xl pds-spacing-mar-block-end-4xl"
              >
                <Youtube src={topic.video_id} title={topic.title} />
              </Container>
            </div>
          )}

          {/* Topic guides */}
          {topic.guides &&
            topic.guides.map((guide, idx) => (
              <Container
                key={`${guide.title}-${idx}`}
                width={containerWidth}
                className="landing-page__guides pds-spacing-mar-block-end-2xl"
              >
                <hr className="landing-page__guides-separator" />
                {guide.title ? (
                  <h2 className="text-3xl font-bold landing-page__guides-title">
                    {guide.title}
                  </h2>
                ) : (
                  <h2 className="text-3xl font-bold landing-page__guides-title">
                    Popular guides
                  </h2>
                )}

                <div className="landing-page__guide-items">
                  {guide.links &&
                    guide.links.map((link, idx) =>
                      guide.type === "normal" ? (
                        <GuideItem
                          key={`${link.text}-${idx}`}
                          url={link.url}
                          image={link.image}
                          text={link.text}
                        />
                      ) : (
                        <IntegrationGuideItem
                          key={`${link.text}-${idx}`}
                          url={link.url}
                          image={link.image || ""}
                        />
                      )
                    )}
                </div>
              </Container>
            ))}

          {/* Subtopics */}
          {topic.subtopics && (
            <div
              className="pds-spacing-pad-block-start-5xl"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--pds-spacing-3xl)",
              }}
            >
              {topic.subtopics &&
                topic.subtopics.map((subtopic, idx) => (
                  <div
                    key={`${subtopic.title}-${idx}`}
                    className="landing-page__subtopics"
                  >
                    <SubTopicGroup
                      key={subtopic.title}
                      title={subtopic.title}
                      subTitle={subtopic.subtitle}
                      topics={subtopic.subtopic_lists}
                    />
                  </div>
                ))}
            </div>
          )}

          {/* Topic groups */}
          {topic.topics_groups && (
            <div className="pds-spacing-pad-block-5xl">
              <Container
                width={containerWidth}
                className="landing-page__topics pds-grid"
              >
                {topic.topics_groups &&
                  topic.topics_groups.map((group, key) => (
                    <LinksCard
                      className={
                        topicGroupsColumns === "two"
                          ? twoColumnClasses
                          : threeColumnClasses
                      }
                      key={group.title}
                      headingLevel="h2"
                      headingText={group.title}
                      linkItems={group.links.map((link, index) => (
                        <Link
                          style={{
                            color: "var(--pds-color-interactive-link-default)",
                            fontWeight:
                              "var(--pds-typography-font-weight-regular)",
                          }}
                          href={link.url ?? "#"}
                        >
                          {link.text}
                        </Link>
                      ))}
                    />
                  ))}
              </Container>
            </div>
          )}

          {/* Related resources */}
          {(topic.cta || topic.cta_alt) && (
            <div className="landing-page__related pds-spacing-pad-block-start-4xl pds-spacing-pad-block-end-5xl">
              <Container width={containerWidth}>
                <h2 className="landing-page__section-heading text-3xl font-bold">
                  Related Resources
                </h2>
                <div
                  style={{
                    display: "flex",
                    gap: "var(--pds-spacing-2xl)",
                  }}
                >
                  {topic.cta && (
                    <CallToAction
                      title={topic.cta.title}
                      type={topic.cta.type}
                      subTitle={topic.cta.subtitle}
                      url={topic.cta.url}
                      dark={false}
                    />
                  )}
                  {topic.cta_alt && (
                    <CallToAction
                      title={topic.cta_alt.title}
                      type={topic.cta_alt.type}
                      subTitle={topic.cta_alt.subtitle}
                      url={topic.cta_alt.url}
                      dark
                    />
                  )}
                </div>
              </Container>
            </div>
          )}
        </main>
      </DocsSidebarLayout>
    </Layout>
  );
};
