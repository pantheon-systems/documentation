import { CallToAction } from "@/components/common/call-to-action";
import { GuideItem } from "@/components/common/guide-item";
import { IntegrationGuideItem } from "@/components/common/integration-guide-item";
import {
  SectionGroups,
  type SectionGroup,
  type SectionGroupLink,
} from "@/components/common/section-groups";
import { Youtube } from "@/components/common/youtube";
import { DocsPage } from "@/components/docs-page";
import { Container } from "@/components/ui/pds-re-export";
import { getOmniItems } from "@/components/omni-components";
import { getOmniSidebarActiveSection } from "@/components/omni-components/helpers";
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

// A card shows each link once, even when it is listed under several sub-lists,
// and skips an entry with no text or URL rather than drawing an empty item.
const uniqueLinks = (links: SectionGroupLink[]) => {
  const usable = links.filter((link) => link.text?.trim() && link.url);
  return usable.filter(
    (link, index) =>
      usable.findIndex((other) => other.url === link.url) === index,
  );
};

// The section's cards: the subtopics, then the other topic groups, in the order
// the data lists them. A subtopic's sub-lists are flattened into one list.
const toSectionGroups = (topic: Landing): SectionGroup[] => [
  ...(topic.subtopics ?? []).map((subtopic) => ({
    title: subtopic.title,
    description: subtopic.subtitle,
    links: uniqueLinks(
      (subtopic.subtopic_lists ?? []).flatMap((list) => list.links ?? []),
    ),
  })),
  ...(topic.topics_groups ?? []).map((group) => ({
    title: group.title,
    description: group.subtitle,
    links: uniqueLinks(group.links ?? []),
  })),
];

export const LandingTemplate = async ({ topic }: { topic: Landing }) => {
  if (!topic) {
    return null;
  }

  // The section's own index page is named like its menu item (the PDS
  // prototype's "Development workflows"), so the title, breadcrumb and header
  // menu agree. A page inside a section keeps its own title and gets the
  // section as an extra breadcrumb.
  const section = getOmniSidebarActiveSection(topic.path, await getOmniItems());
  const isSectionIndex = !!section && section.link === `/${topic.path}`;
  const title = isSectionIndex
    ? section.header?.label ?? topic.title
    : topic.title;
  const groups = toSectionGroups(topic);

  return (
    <DocsPage
      activePage={topic.path}
      title={title}
      header={
        <>
          <h1 className="pan-docs-page-header__title">{title}</h1>
          {topic.subtitle && (
            <p className="pan-docs-page-header__lede">{topic.subtitle}</p>
          )}
        </>
      }
    >
      {/* Video */}
      {topic.video_id && (
        <Container
          width={containerWidth}
          className="landing-page__video pds-mar-block-end-3xl"
        >
          <Youtube src={topic.video_id} title={title} />
        </Container>
      )}

      {/* Topic guides */}
      {topic.guides &&
        topic.guides.map((guide, idx) => (
          <Container
            key={`${guide.title}-${idx}`}
            width={containerWidth}
            className="landing-page__guides pds-mar-block-end-2xl"
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
                  ),
                )}
            </div>
          </Container>
        ))}

      {/* The section's cards */}
      {groups.length > 0 && (
        <Container
          width={containerWidth}
          className="landing-page__section pds-pad-block-end-4xl"
        >
          <h2 className="landing-page__section-heading pds-heading-2xl pds-mar-block-end-l">
            In this section
          </h2>
          <SectionGroups groups={groups} />
        </Container>
      )}

      {/* Related resources */}
      {(topic.cta || topic.cta_alt) && (
        <div className="landing-page__related pds-pad-block-start-4xl pds-pad-block-end-5xl">
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
    </DocsPage>
  );
};
