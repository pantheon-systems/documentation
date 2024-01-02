import React from "react"
import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"

import Layout from "../layout/layout"
import NavButtons from "../components/navButtons"
import Callout from "../components/callout"
import Alert from "../components/alert"
import Accordion from "../components/accordion"
import ExternalLink from "../components/externalLink"
import Popover from "../components/popover"
import TabList from "../components/tabList"
import Tab from "../components/tab"
import TOC from "../components/toc"
import Card from "../components/card"
import CardGroup from "../components/cardGroup"
import SEO from "../layout/seo"
import Enablement from "../components/enablement"
import Color from "../components/color.js"
import Download from "../components/download"
import ReleaseNoteTeaser from "../components/releaseNoteTeaser.js"
// import { releaseNotePseudoQueryFields } from "../data/fragments.js"


import {
  headline1,
  headline2,
  headline3,
  headline4,
} from "../components/releaseHeadlines"

import {
  Container,
  Icon,
  Pager,
} from "@pantheon-systems/pds-toolkit-react"

const shortcodes = {
  Callout,
  Alert,
  Accordion,
  ExternalLink,
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



const MdxWrapper = ({ mdx }) => {
  return (
    <MDXProvider components={shortcodes}>
      <MDXRenderer>{mdx}</MDXRenderer>
    </MDXProvider>
  )
}
export default MdxWrapper
