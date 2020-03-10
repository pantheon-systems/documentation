import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import Layout from "../layout/layout"
import CallToAction from "../layout/call-to-action"
import TopicGroup from "../layout/topic-group"
import SubTopicGroup from "../layout/subtopic-group"
import YoutubeVideo from "../layout/youtube-video"
import GuideItem from "../layout/guide-item"
import IntegrationGuideItem from "../layout/integration-guide-item"
import SEO from "../layout/seo"

class LandingTemplate extends Component {
  render() {
    const {
      data: { landingsYaml },
    } = this.props
    const topic = landingsYaml
    return !topic ? null : (
      <Layout>
        <SEO title={topic.title} />
        <div style={{ marginTop: "-20px" }} className="container">
          <div className="container doc-content-well">
            <div className="row">
              <h1 className="title">{topic.title}</h1>
            </div>
            <div className="row" style={{ marginBottom: "15px" }}>
              <div className="">
                <div className="row call-to-action-section">
                  {topic.video_id && (
                    <div className="col-md-6 hero-video__video">
                      <YoutubeVideo videoId={topic.video_id} />
                    </div>
                  )}
                  {(topic.cta || topic.cta_alt) && (
                    <div className="col-md-6 ">
                      {topic.cta && (
                        <CallToAction
                          title={topic.cta.title}
                          subTitle={topic.cta.subtitle}
                          url={topic.cta.url}
                        />
                      )}{" "}
                      <br />
                      {topic.cta_alt && (
                        <CallToAction
                          title={topic.cta_alt.title}
                          subTitle={topic.cta_alt.subtitle}
                          url={topic.cta_alt.url}
                          dark
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {topic.guides &&
              topic.guides.map(guide => (
                <React.Fragment>
                  {guide.title && <h2>{guide.title}</h2>}
                  <div className="flex-panel-group">
                    {guide.links &&
                      guide.links.map(link =>
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
                </React.Fragment>
              ))}
            <div className="row mt-70">
              {topic.subtopics &&
                topic.subtopics.map(subtopic => (
                  <SubTopicGroup
                    key={subtopic.title}
                    title={subtopic.title}
                    subTitle={subtopic.subtitle}
                    topics={subtopic.subtopic_lists}
                  />
                ))}
            </div>
            <div className="row topic-groups">
              {topic.topics_groups &&
                topic.topics_groups.map((group, key) => (
                  <React.Fragment>
                    <TopicGroup
                      key={group.title}
                      title={group.title}
                      subTitle={group.subtitle}
                      docs={group.links}
                    />
                    {(key + 1) % 2 === 0 ? <hr /> : null}
                  </React.Fragment>
                ))}
            </div>
          </div>
        </div>
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
      video_id
      path
      cta {
        title
        subtitle
        url
      }
      cta_alt {
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
