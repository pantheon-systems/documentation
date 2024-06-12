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
import Image from "../layout/image"
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
import Product from "./product"
import ProductGroup from "./productGroup"
import Youtube from "./youtube"
import Wistia from "./wistia"

const defaultShortcodes = {
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
  Youtube
}

const MdxWrapper = ({ mdx, customShortcodes = {} }) => {
  // Custom shortcodes can be passed in as a prop to allow for
  // things like the changing of heading levels in ReleaseNoteTeaser
  const mergedShortcodes = { ...defaultShortcodes, ...customShortcodes };
  return (
    <MDXProvider components={mergedShortcodes}>
      <MDXRenderer>{mdx}</MDXRenderer>
    </MDXProvider>
  )
}
export default MdxWrapper
