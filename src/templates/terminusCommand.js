import React from "react"
import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"

import GuideLayout from "../layout/GuideLayout"
import HeaderBody from "../components/headerBody"
import Callout from "../components/callout"
import Alert from "../components/alert"
import Accordion from "../components/accordion"
import ExternalLink from "../components/externalLink"
import Icon from "../components/icon"
import Popover from "../components/popover"
import TabList from "../components/tabList"
import Tab from "../components/tab"
import TOC from "../components/toc"
import GetFeedback from "../components/getFeedback"
import Card from "../components/card"
import CardGroup from "../components/cardGroup"
import Navbar from "../components/navbar"
import NavButtons from "../components/navButtons"
import SEO from "../layout/seo"
import Releases from "../components/releases"
import TerminusVersion from "../components/terminusVersion"
import Download from "../components/download"
import Commands from "../components/commands"
import Partial from "../components/partial"
import ReviewDate from "../components/reviewDate"
import Check from "../components/check.js"
import SearchBar from "../layout/SearchBar"
let commandsJson = require("../../source/data/commands.json")

import { Container, SidebarLayout } from "@pantheon-systems/pds-toolkit-react"

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
  Releases,
  TerminusVersion,
  Download,
  Commands,
  ReviewDate,
  Check,
  Partial,
}

// @TODO relocate this list
// - To a YAML file and use GraphQL to pull data.
// - To a GraphQL query order by frontmatter weight/order/index field.
const items = [
  {
    id: "docs-terminus",
    link: "/terminus",
    title: "Introduction",
  },
  {
    id: "docs-terminus-install",
    link: "/terminus/install",
    title: "Install Terminus",
  },
  {
    id: "docs-terminus-examples",
    link: "/terminus/examples",
    title: "Get Started",
  },
  {
    id: "docs-terminus-commands",
    link: "/terminus/commands",
    title: "Command Directory",
  },
  {
    id: "docs-terminus-scripting",
    link: "/terminus/scripting",
    title: "Scripting with Terminus",
  },
  {
    id: "docs-terminus-plugins",
    link: "/terminus/plugins",
    title: "Install Plugins",
  },
  {
    id: "docs-terminus-directory",
    link: "/terminus/directory",
    title: "Plugin Directory",
  },
  {
    id: "docs-terminus-create",
    link: "/terminus/create",
    title: "Create Terminus Plugins",
  },
  {
    id: "docs-terminus-configuration",
    link: "/terminus/configuration",
    title: "Terminus Configuration File",
  },

  {
    id: "docs-supported-terminus",
    link: "/terminus/supported-terminus",
    title: "Supported Terminus and PHP Versions",
  },

  {
    id: "docs-terminus-updates",
    link: "/terminus/updates",
    title: "Current Terminus Release and Changelog",
  },

  {
    id: "docs-terminus-terminus-3-0",
    link: "/terminus/terminus-3-0",
    title: "Terminus 3",
  },
]

class CommandsTemplate extends React.Component {
  componentDidMount() {
    $("[data-toggle=popover]").popover({
      trigger: "click",
    })

    $("body").on("click", function (e) {
      $('[data-toggle="popover"]').each(function () {
        if (
          !$(this).is(e.target) &&
          $(this).has(e.target).length === 0 &&
          $(".popover").has(e.target).length === 0
        ) {
          $(this).popover("hide")
        }
      })
    })

    $("body").keyup(function (e) {
      $('[data-toggle="popover"]').each(function () {
        if (event.which === 27) {
          $(this).popover("hide")
        }
      })
    })
  }

  render() {
    const slug = this.props.pageContext.slug
    //console.log("slug: ", slug) // For Debugging

    const name = this.props.pageContext.name
    //console.log("name: ", name) //For Debugging

    const commands = this.props.data.dataJson.commands
    //console.log("commands: ", commands) //For Debugging

    const getCommandBySlug = (slug) =>
      commands.find(({ name }) => name === slug)
    const getCommandJSONBySlug = (slug) =>
      commandsJson.commands.find(({ name }) => name === slug)

    const command = getCommandBySlug(name)
    //console.log("command: ", command) //For Debugging

    const thisCommandJson = getCommandJSONBySlug(name)
    //console.log("thisCommandJson: ", thisCommandJson) //For Debugging

    var options = Object.keys(thisCommandJson.definition.options).map(function (
      key
    ) {
      return [String(key), thisCommandJson.definition.options[key]]
    })
    options.forEach((option) => {
      option.shift()
    })

    options.sort((a, b) => (a[0].name > b[0].name ? 1 : -1))
    options.sort(function (a, b) {
      return a[0].name.localeCompare(b[0].name)
    })
    //console.log("Options: ", options) //For Debugging

    return (
      <GuideLayout>
        <SEO
          slot="seo"
          title={command.name + " | Terminus Commands"}
          description={command.description}
          image={"/images/assets/terminus-thumbLarge.png"}
        />
        <Navbar
          slot="guide-menu"
          title={`Terminus Command Reference`}
          items={items}
          activePage="/terminus/commands"
          className="manual-guide-toc"
        />
        <Container slot="guide-content">
          <SearchBar slot="content" page="default" />
          <main slot="content" id="docs-main" tabindex="-1">
            <article className="doc guide-doc-body pds-spacing-pad-block-end-2xl">
              <div className="pds-overline-text pds-spacing-pad-block-xs">
                Command
              </div>
              <HeaderBody
                title="Terminus Command Reference"
                subtitle={`terminus ${command.name}`}
                description=""
                slug={slug}
              />
              <h2>Description</h2>
              <p>{command.description}</p>

              <h2>Example Usage</h2>
              <div className="pds-spacing-mar-block-start-l pds-spacing-mar-block-end-4xl">
                <pre className="language-bash">
                  <code className="language=bash">
                    terminus {command.usage[0].replace(/\[|\]/g, "")}
                  </code>
                </pre>
              </div>

              <div className="pds-spacing-mar-block-end-4xl">
                {command.usage.map((usage, i) => {
                  if (i !== 0) {
                    return (
                      <>
                        <p key={i}>
                          <code
                            key={`${i}-pre`}
                            className="pds-spacing-mar-inline-end-2xs"
                          >
                            {usage
                              .replace(/\[|\]/g, "")
                              .replace(/(?!^)\s\b[A-Z][a-z]\w*.+/g, "")}
                          </code>{" "}
                          {usage
                            .replace(/\[|\]/g, "")
                            .match(/(?!^)\b[A-Z][a-z]*\b.+/)}
                        </p>
                        <hr className="commandHr" />
                      </>
                    )
                  }
                })}
              </div>

              <h2>Options</h2>
              <div className="pds-spacing-mar-block-end-4xl">
                <table>
                  <thead>
                    <tr>
                      <th>Option</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {options.map((option) => {
                      return (
                        <>
                          <tr key={option}>
                            <td key={`${option}-name`}>{option[0].name}</td>
                            <td key={`${option}-desc`}>
                              {option[0].description}
                            </td>
                          </tr>
                        </>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <Partial file={`terminus/${slug}.md`} />

              <Link to="/terminus/commands">Back to all commands</Link>
            </article>
          </main>
        </Container>
        <GetFeedback page={"/" + slug} />
      </GuideLayout>
    )
  }
}

export default CommandsTemplate

export const pageQuery = graphql`
  query CommandsData {
    dataJson {
      commands {
        name
        usage
        description
      }
    }
  }
`
