import React from "react"
import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"

import Layout from "../layout/layout"
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
let commandsJson = require('../../source/data/commands.json')

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
    title: "Get Started",
  },
  {
    id: "docs-terminus-install",
    link: "/terminus/install",
    title: "Install",
  },
  {
    id: "docs-terminus-examples",
    link: "/terminus/examples",
    title: "Example Usage",
  },
  {
    id: "docs-terminus-commands",
    link: "/terminus/commands",
    title: "Commands",
  },
  {
    id: "docs-terminus-scripting",
    link: "/terminus/scripting",
    title: "Scripting",
  },
  {
    id: "docs-terminus-plugins",
    link: "/terminus/plugins",
    title: "Extend with Plugins",
    items: [
      {
        id: "docs-terminus-directory",
        link: "/terminus/plugins/directory",
        title: "Directory",
      },
      {
        id: "docs-terminus-create",
        link: "/terminus/plugins/create",
        title: "Create Plugins",
      },
    ],
  },
  {
    id: "docs-terminus-configuration",
    link: "/terminus/configuration",
    title: "Configuration File",
  },
  {
    id: "docs-terminus-updates",
    link: "/terminus/updates",
    title: "Version Updates",
  },
]

class CommandsTemplate extends React.Component {
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
    const contentCols = 12

    const slug = this.props.pageContext.slug
    //console.log("slug: ", slug) // For Debugging

    const name = this.props.pageContext.name
    //console.log("name: ", name) //For Debugging

    const commands = this.props.data.dataJson.commands
    //console.log("commands: ", commands) //For Debugging

    const getCommandBySlug = slug => commands.find(({name}) => name === slug)
    const getCommandJSONBySlug = slug => commandsJson.commands.find(({name}) => name === slug)

    const command = getCommandBySlug(name)
    //console.log("command: ", command) //For Debugging

    const thisCommandJson = getCommandJSONBySlug(name)
    //console.log("thisCommandJson: ", thisCommandJson) //For Debugging

    var options = Object.keys(thisCommandJson.definition.options).map(function (key) {
      return [String(key), thisCommandJson.definition.options[key]]
    })
    options.forEach(option => {
      option.shift()
    })

    options.sort((a, b) => (a[0].name > b[0].name) ? 1 : -1)
    options.sort(function(a, b) {
      return a[0].name.localeCompare(b[0].name);
    })
    //console.log("Options: ", options) //For Debugging

    return (
      <Layout>
        <SEO
          title={command.name + " | Terminus Commands"}
          description={command.description}
          image={"/assets/images/terminus-thumbLarge.png"}
        />
        <div className="">
          <div className="container-fluid">
            <div className="row col-md-10 guide-nav manual-guide-toc-well">
              <Navbar
                title={`Terminus Command Reference`}
                items={items}
                activePage="/terminus/commands"
                className="manual-guide-toc"
              />
              <div id="doc" className="terminus col-md-9 guide-doc-body">
                <div className="row guide-content-well">
                  <div
                    className={`col-xs-${contentCols} col-md-${contentCols}`}
                  >
                    <HeaderBody
                      title="Terminus Command Reference"
                      subtitle={`terminus ${command.name}`}
                      description=""
                      slug={slug}
                    />
                    <h2>Description</h2>
                    {command.description}
                    <br />
                    <h2>Example Usage</h2>
                    <pre className="language-bash"><code className="language=bash">terminus {command.usage[0].replace(/\[|\]/g, "")}</code></pre>
                    <br />
                    {command.usage.map( (usage, i) => {
                      if (i  !== 0) { return (
                        <>
                        <p key={i}>
                        <code key={`${i}-pre`}>{usage.replace(/\[|\]/g, "").replace(/(?!^)\s\b[A-Z][a-z]\w*.+/g, '')}</code> {usage.replace(/\[|\]/g, "").match(/(?!^)\b[A-Z][a-z]*\b.+/)}
                        </p>
                        <hr className="commandHr"/>
                        </>
                      )}
                    })}

                    <h2>Options</h2>
                    <table>
                    <thead>
                      <tr>
                        <th>Option</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                    {options.map(( option ) => {
                      return (
                        <>
                        <tr key={option}>
                          <td key={`${option}-name`}>{option[0].name}</td>
                          <td key={`${option}-desc`}>{option[0].description}</td>
                        </tr>
                        </>
                      )
                    })}
                    </tbody>
                    </table>

                    <Partial file={`terminus/${slug}.md`} />
                    <Link to="/terminus/commands">Back to all commands</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <GetFeedback page={"/" + slug} />
      </Layout>
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
