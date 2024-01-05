import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import CallToAction from "../layout/call-to-action"
import Layout from "../layout/layout"
import TopicGroup from "../layout/topic-group"
import SubTopicGroup from "../layout/subtopic-group"
import Youtube from "../components/youtube"
import GuideItem from "../layout/guide-item"
import IntegrationGuideItem from "../layout/integration-guide-item"
import SEO from "../layout/seo"
import Wistia from "../components/wistia"

import TwoColumnLinks from "../pds-middleware/TwoColumnLinks"

import {
  Container,
  FlexContainer,
  LinksCard,
} from "@pantheon-systems/pds-toolkit-react"

// Set container width for search and main content.
const containerWidth = "narrow"

const twoColumnClasses =
  "pds-grid-item pds-grid-item--sm-4 pds-grid-item--md-6 pds-grid-item--lg-6"

const threeColumnClasses =
  "pds-grid-item pds-grid-item--sm-4 pds-grid-item--md-6 pds-grid-item--lg-4"

class LandingTemplate extends Component {
  render() {
    const {
      data: { landingsYaml },
    } = this.props
    const topic = landingsYaml

    // Check for amount of topic groups if they exist.
    const groupLength = topic.topics_groups ? topic.topics_groups.length : null
    const topicGroupsColumns =
      groupLength === 2 || groupLength === 4 ? "two" : "three"

    return !topic ? null : (
      <Layout
        containerWidth={containerWidth}
        footerBorder={topic.footer_border}
      >
        <SEO title={topic.title} />
        <main id="docs-main" tabindex="-1">
          <Container width={containerWidth} className="landing-page__header">
            <FlexContainer
              alignItems="center"
              flexDirection="column"
              mobileFlex="same"
              spacing="narrow"
              className="landing-page-heading pds-spacing-pad-block-m"
            >
              <h1 className="pds-spacing-mar-block-end-xs">{topic.title}</h1>
              {topic.subtitle && (
                <div className="pds-lead-text pds-lead-text--small pds-spacing-mar-block-end-xs">
                  {topic.subtitle}
                </div>
              )}
            </FlexContainer>
          </Container>
          {/* Video */}
          {topic.video_id && (
            <div className="landing-page__video-background">
              <Container
                width={containerWidth}
                className="video-container  pds-spacing-mar-block-start-xl pds-spacing-mar-block-end-4xl"
              >
                <Youtube src={topic.video_id} title={topic.title} />
              </Container>
            </div>
          )}

          {/* Topic guides */}
          {topic.guides &&
            topic.guides.map((guide) => (
              <Container
                width={containerWidth}
                className="landing-page__guides pds-spacing-mar-block-end-2xl"
              >
                <hr className="landing-page__guides-separator" />
                {guide.title ? (
                  <h2 className="landing-page__guides-title">{guide.title}</h2>
                ) : (
                  <h2 className="landing-page__guides-title">Popular guides</h2>
                )}

                <div className="landing-page__guide-items">
                  {guide.links &&
                    guide.links.map((link) =>
                      guide.type === "normal" ? (
                        <GuideItem
                          url={link.url}
                          image={link.image}
                          text={link.text}
                        />
                      ) : (
                        <IntegrationGuideItem
                          url={link.url}
                          image={link.image}
                        />
                      )
                    )}
                </div>
              </Container>
            ))}

          {/* Subtopics */}
          {topic.subtopics && (
            <FlexContainer
              flexDirection="column"
              mobileFlex="same"
              spacing="wide"
              className="pds-spacing-pad-block-start-5xl"
            >
              {topic.subtopics &&
                topic.subtopics.map((subtopic) => (
                  <div className="landing-page__subtopics">
                    <SubTopicGroup
                      key={subtopic.title}
                      title={subtopic.title}
                      subTitle={subtopic.subtitle}
                      topics={subtopic.subtopic_lists}
                    />
                  </div>
                ))}
            </FlexContainer>
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
                        <Link to={link.url}>{link.text}</Link>
                      ))}
                    />
                  ))}
              </Container>
            </div>
          )}

          {/* Related resources */}
          {(topic.cta || topic.cta_alt) && (
            <div className="landing-page__related pds-background-default-secondary pds-spacing-pad-block-start-4xl pds-spacing-pad-block-end-5xl">
              <Container width={containerWidth}>
                <h2 className="landing-page__section-heading">
                  Related Resources
                </h2>
                <FlexContainer spacing="wide">
                  {topic.cta && (
                    <CallToAction
                      title={topic.cta.title}
                      type={topic.cta.type}
                      subTitle={topic.cta.subtitle}
                      url={topic.cta.url}
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
                </FlexContainer>
              </Container>
            </div>
          )}
        </main>
      </Layout>
    )
  }
}

LandingTemplate.propTypes = {}

export default LandingTemplate

export const pageQuery = graphql`
  query landing($id: String!) {
    landingsYaml(id: { eq: $id }) {
      id
      title
      subtitle
      footer_border
      video_id
      path
      cta {
        type
        title
        subtitle
        url
      }
      cta_alt {
        type
        title
        subtitle
        url
      }
      topics_groups {
        title
        subtitle
        links {
          text
          url
          icon
        }
      }
      subtopics {
        title
        subtitle
        subtopic_lists {
          title
          links {
            text
            url
            icon
          }
        }
      }
      guides {
        title
        type
        links {
          text
          image
          url
        }
      }
    }
  }
`
