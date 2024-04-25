import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import Callout from "./callout"
import Alert from "./alert"
import Accordion from "./accordion"
import BuildTools from "./buildTools.js"
import BuildToolsChangelog from "./buildToolsChangelog.js"
import ResourceSelector from "./resourceSelector"
import DrushChangelog from "./drushChangelog"
import DNSProviderDocs from "./dns-provider-docs.js"
import LocaldevChangelog from "./localdevChangelog"
import Example from "./styleExample"
import ExternalLink from "./externalLink"
import Popover from "./popover"
import TabList from "./tabList"
import Tab from "./tab"
import Card from "./card"
import CardGroup from "./cardGroup"
import Enablement from "./enablement"
import Color from "./color.js"
import Download from "./download"
import Icon from "./icon"
import Releases from "./releases"
import TerminusVersion from "./terminusVersion"
import Commands from "./commands"
import ReviewDate from "./reviewDate"
import Check from "./check.js"
import Partial from "./partial"
import Product from "../components/product"
import ProductGroup from "../components/productGroup"
import Youtube from "./youtube"
import Wistia from "./wistia"

import {
  headline2,
  headline3,
  headline4,
} from "./releaseHeadlines"


const shortcodes = {
  Accordion,
  Alert,
  BuildTools,
  BuildToolsChangelog,
  Callout,
  Card,
  CardGroup,
  Check,
  Color,
  Commands,
  DNSProviderDocs,
  Download,
  DrushChangelog,
  Enablement,
  Example,
  ExternalLink,
  Icon,
  Image,
  LocaldevChangelog,
  Partial,
  Popover,
  Product,
  ProductGroup,
  ResourceSelector,
  Releases,
  ReviewDate,
  Tab,
  TabList,
  TerminusVersion,
  Wistia,
  Youtube,
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
