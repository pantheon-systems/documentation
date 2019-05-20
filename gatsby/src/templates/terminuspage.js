import React from "react"
import { graphql } from "gatsby"

import MDXRenderer from "gatsby-mdx/mdx-renderer"
import { MDXProvider } from "@mdx-js/react"

import Layout from "../components/layout"
// import SiteInfo from "../components/siteInfo"
// import SEO from "../components/seo"

import Callout from "../components/callout"
import Alert from "../components/alert"
import Accordion from "../components/accordion"
import ExternalLink from "../components/externalLink"
import Icon from "../components/icon"
import Popover from "../components/popover"
import Contributors from "../components/contributors"
import TabList from "../components/tabList"
import Tab from "../components/tab"
import TOC from "../components/toc"
import Github from "../components/github"
import Twitter from "../components/twitter"
import Slack from "../components/slack"

const shortcodes = {
  Callout,
  Alert,
  Accordion,
  ExternalLink,
  Icon,
  Popover,
  TabList,
  Tab,
}

class TerminusTemplate extends React.Component {
  componentDidMount() {
    window.jQuery('[data-toggle="tooltip"]').popover({
      trigger: "hover",
      placement: "right",
    })
  }

  render() {
    const node = this.props.data.mdx
    const patt = /[^/]*\.md/
    const sourceName = patt.exec(node.fileAbsolutePath)
    const sourcePath = `${sourceName[0].replace(".md", "")}`

    return (
      <Layout>
        <div className="container-fluid">
          <div className="row col-md-12 guide-nav manual-guide-toc-well">
            <div class="col-md-3 manual-guide-toc" role="navigation">
              {/* <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target="#guide-collapse"
                >
                  <span class="sr-only">Toggle navigation</span>
                  <i class="fa fa-bars" />
                </button> */}
              <h3>Terminus Manual</h3>
              <div class="collapse navbar-collapse" id="guide-collapse">
                <ul id="manual-guide-toc" class="manual-guide-toc">
                  <li>
                    <a id="docs-terminus" href="/docs/terminus">
                      Get Started
                    </a>
                  </li>
                  <li>
                    <a id="docs-terminus-install" href="/docs/terminus/install">
                      Install
                    </a>
                  </li>
                  <li>
                    <a
                      id="docs-terminus-examples"
                      href="/docs/terminus/examples"
                    >
                      Example Usage
                    </a>
                  </li>
                  <li>
                    <a
                      id="docs-terminus-commands"
                      href="/docs/terminus/commands"
                    >
                      Commands
                    </a>
                  </li>
                  <li>
                    <a
                      id="docs-terminus-scripting"
                      href="/docs/terminus/scripting"
                    >
                      Scripting
                    </a>
                  </li>
                  <li>
                    <a id="docs-terminus-plugins" href="/docs/terminus/plugins">
                      Extend with Plugins
                    </a>
                  </li>
                  <ul id="manual-guide-toc" class="manual-guide-toc child">
                    <li>
                      <a
                        id="docs-terminus-directory"
                        href="/docs/terminus/plugins/directory"
                      >
                        Directory
                      </a>
                    </li>
                    <li>
                      <a
                        id="docs-terminus-create"
                        href="/docs/terminus/plugins/create"
                      >
                        Create Plugins
                      </a>
                    </li>
                  </ul>
                  <li>
                    <a
                      id="docs-terminus-configuration"
                      href="/docs/terminus/configuration"
                    >
                      Configuration File
                    </a>
                  </li>
                  <li>
                    <a id="docs-terminus-updates" href="/docs/terminus/updates">
                      Version Updates
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div id="terminus" className="article col-md-9 md-70">
              <h1>{node.frontmatter.subtitle}</h1>
              <p className="article-subhead">{node.frontmatter.description}</p>
              <Contributors contributors={node.frontmatter.contributors} />
              <Github
                sourceName={sourceName[0]}
                pageTitle={node.frontmatter.title}
                path={sourcePath}
              />
              <Twitter pageTitle={node.frontmatter.title} path={sourcePath} />
              <Slack />
              <MDXProvider components={shortcodes}>
                <MDXRenderer>{node.code.body}</MDXRenderer>
              </MDXProvider>
            </div>

            <div
              className="col-md-3 pio-docs-sidebar hidden-print hidden-xs hidden-sm affix-top"
              role="complementary"
            >
              <TOC title="Contents" />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default TerminusTemplate

export const pageQuery = graphql`
  query TerminusPageBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      code {
        body
      }
      frontmatter {
        title
        subtitle
        description
        nexturl
        previousurl
        contributors {
          id
          name
        }
      }
      fileAbsolutePath
    }
  }
`
