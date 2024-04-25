import React from "react"

import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"


import Callout from "../callout"
import Alert from "../alert"
import Accordion from "../accordion"
import ExternalLink from "../externalLink"
import Icon from "../icon"
import Popover from "../popover"
import TabList from "../tabList"
import Tab from "../tab"
import Card from "../card"
import CardGroup from "../cardGroup"
import Releases from "../releases"
import TerminusVersion from "../terminusVersion"
import Download from "../download"
import Commands from "../commands"
import ReviewDate from "../reviewDate"
import Check from "../check.js"
import Partial from "../partial"
import Youtube from "../youtube"
import Wistia from "../wistia"

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
  Partial,
  Commands,
  ReviewDate,
  Check,
  Youtube,
  Wistia,
}

const mdxWithShortcodes = ({ mdxContent }) => {


  return (
      <MDXProvider components={shortcodes}>
        <MDXRenderer>{mdxContent}</MDXRenderer>
      </MDXProvider>
  )
}

export default mdxWithShortcodes
