import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import Layout from "../layout/layout"
import CallToAction from "../layout/call-to-action"
import TopicGroup from "../layout/topic-group"
import SubTopicGroup from "../layout/subtopic-group"
import Youtube from "../components/youtube"
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
          <main className="container doc-content-well" id="docs-main">
              <h1 className="title">{topic.title}</h1>
              <section className="row">
                  {topic.video_id && (
                    <div className="col-md-6 hero-video__video">
                      <Youtube src={topic.video_id} title={topic.title}/>
                    </div>
                  )}
                  {(topic.cta || topic.cta_alt) && (
                    <div className="col-md-6">
                      {topic.cta && (
                        <CallToAction
                          title={topic.cta.title}
                          type={topic.cta.type}
                          subTitle={topic.cta.subtitle}
                          url={topic.cta.url}
                        />
                      )}{" "}

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
                  )}
                </section>
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
            
              {topic.subtopics &&
                topic.subtopics.map(subtopic => (
                  <SubTopicGroup
                    key={subtopic.title}
                    title={subtopic.title}
                    subTitle={subtopic.subtitle}
                    topics={subtopic.subtopic_lists}
                  />
                ))}

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
