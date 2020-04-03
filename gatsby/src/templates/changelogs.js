import React from "react"
import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"

import Layout from "../layout/layout"
import NavButtons from "../components/navButtons"
// import HeaderBody from "../components/headerBody"

import Callout from "../components/callout"
import Alert from "../components/alert"
import Accordion from "../components/accordion"
import ExternalLink from "../components/externalLink"
import Icon from "../components/icon"
import Popover from "../components/popover"
import TabList from "../components/tabList"
import Tab from "../components/tab"
import TOC from "../components/toc"
// import GetFeedback from "../components/getFeedback"
import Card from "../components/card"
import CardGroup from "../components/cardGroup"
import SEO from "../layout/seo"
import Enablement from "../components/enablement"
import Color from "../components/color.js"
import Download from "../components/download"

import {
  headline1,
  headline2,
  headline3,
  headline4,
} from "../components/releaseHeadlines"

const shortcodes = {
  Callout,
  Alert,
  Accordion,
  ExternalLink,
  Icon,
  Popover,
  TabList,
  Tab,
  Card,
  CardGroup,
  Enablement,
  Color,
  Download,
  h1: headline2,
  h2: headline3,
  h3: headline4,
}

class ChangelogsTemplate extends React.Component {
  componentDidMount() {
    $("[data-toggle=popover]").popover({
      trigger: "click",
    })

    $("body").on("click", function(e) {
      $('[data-toggle="popover"]').each(function() {
        if (
          !$(this).is(e.target) &&
          $(this).has(e.target).length === 0 &&
          $(".popover").has(e.target).length === 0
        ) {
          $(this).popover("hide")
        }
      })
    })

    $("body").keyup(function(e) {
      $('[data-toggle="popover"]').each(function() {
        if (event.which === 27) {
          $(this).popover("hide")
        }
      })
    })
  }

  render() {
    const changelogs = this.props.data.allMdx.edges
    return (
      <Layout>
        <SEO
          title="Pantheon Changelog"
          description="Pantheon Changelog"
          image={"assets/images/default-thumb-doc.png"}
        />
        <div className="">
          <div className="container doc-content-well">
            <div id="doc" className="doc article col-md-9 md-70">
              <h1 className="toc-ignore">Pantheon Changelog</h1>
              <Callout
                title="Subscribe Now"
                link="https://learn.pantheon.io/Changelog-Opt-In.html"
              >
                Sign up for the Pantheon Changelog Newsletter to receive a
                monthly email on what's new and improved across the platform.
              </Callout>
              <div style={{ marginTop: "15px", marginBottom: "45px" }}>
                {changelogs.map(changelog => (
                  <React.Fragment key={changelog.id}>
                    <Link to={changelog.node.fields.slug}>
                      <h2 id={changelog.node.fields.slug}>
                        {changelog.node.frontmatter.title}
                      </h2>
                    </Link>
                    <MDXProvider components={shortcodes}>
                      <MDXRenderer>{changelog.node.body}</MDXRenderer>
                    </MDXProvider>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <TOC title="Contents" />
          </div>
          <NavButtons
            prev={this.props.pageContext.previous}
            next={this.props.pageContext.next}
            prevTitle="Older"
            nextTitle="Newer"
          />
        </div>
      </Layout>
    )
  }
}

export default ChangelogsTemplate

export const pageQuery = graphql`
  query Changelogs($skip: Int!, $limit: Int!) {
    allMdx(
      filter: { fileAbsolutePath: { regex: "/changelogs/" } }
      sort: { fields: [fileAbsolutePath], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          body
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
