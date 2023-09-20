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

import TwoColumnLinks from "../pds-middleware/TwoColumnLinks"

import {
  Container,
  FlexContainer,
  LinksCard,
} from "@pantheon-systems/pds-toolkit-react"

class LandingTemplate extends Component {
  render() {
    const {
      data: { landingsYaml },
    } = this.props
    const topic = landingsYaml
    return !topic ? null : (
      <Layout>
        <SEO title={topic.title} />
        <main id="docs-main">
          <Container width="narrow" className="landing-page__header">
            <FlexContainer
              alignItems="center"
              flexDirection="column"
              mobileFlex="same"
              spacing="narrow"
              className="landing-page-heading pds-spacing-pad-block-m"
            >
              <h1 className="pds-spacing-mar-block-none">{topic.title}</h1>
              {topic.subtitle && (
                <div className="pds-lead-text pds-spacing-mar-block-end-xs">
                  {topic.subtitle}
                </div>
              )}
            </FlexContainer>
          </Container>

          {topic.video_id && (
            <div className="landing-page__video-background">
              <Container
                width="narrow"
                className="video-container  pds-spacing-mar-block-start-xl pds-spacing-mar-block-end-4xl"
              >
                <Youtube src={topic.video_id} title={topic.title} />
              </Container>
            </div>
          )}

          {topic.guides &&
            topic.guides.map((guide) => (
              <Container width="narrow" className="landing-page__guides">
                {guide.title && <h2>{guide.title}</h2>}
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

          {topic.subtopics &&
            topic.subtopics.map((subtopic) => (
              <SubTopicGroup
                key={subtopic.title}
                title={subtopic.title}
                subTitle={subtopic.subtitle}
                topics={subtopic.subtopic_lists}
              />
            ))}

          <Container
            width="narrow"
            className="pds-grid pds-spacing-mar-block-start-2xl pds-grid pds-spacing-mar-block-end-6xl"
          >
            {topic.topics_groups &&
              topic.topics_groups.map((group, key) => (
                <LinksCard
                  className="pds-grid-item pds-grid-item--sm-4 pds-grid-item--md-6 pds-grid-item--lg-4"
                  key={group.title}
                  headingLevel="h2"
                  headingText={group.title}
                  linkItems={group.links.map((link, index) => (
                    <Link to={link.url}>{link.text}</Link>
                  ))}
                />
              ))}
          </Container>

          {(topic.cta || topic.cta_alt) && (
            <>
              <hr />
              <Container
                width="narrow"
                className="landing-page__related pds-spacing-pad-block-end-5xl"
              >
                <h2>Related Resources</h2>
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
            </>
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
