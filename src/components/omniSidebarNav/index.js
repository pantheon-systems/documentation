import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { SidebarNav, turnItemsIntoLinks } from "../sidebarNav"
import CertificationItems from "./submenus/certification";


const OmniSidebarNav = ({activePage, maximumParent}) => {

  const AllGuides = useStaticQuery(
    graphql`
      {
        allGuides: allMdx(
      filter: {
        fileAbsolutePath: { ne: null }
        fields: {guide_directory: {regex: "/^(?=guides\/).*$/i" }},
        frontmatter: { draft: { ne: true } }
      }
      sort: { fields: [fileAbsolutePath], order: ASC }
    ) {
      edges {
        node {
          id
          fields {
            slug
            guide_directory
          }
          frontmatter {
            title
            subtitle
          }
        }
      }
    }
      }
    `
  );

  const getChildrenForGuideDirectory = (AllTheGuides, guideDirectory) => {
    const ChildItems = [];
    for (let item of AllTheGuides) {
      console.log(item.node.fields.guide_directory);
      if (item.node.fields.guide_directory === guideDirectory) {
        ChildItems.push({
          link: item.node.fields.slug,
          title: item.node.frontmatter.subtitle,
        });
      }
    }
    return ChildItems;
  }

  const getTitleForGuideDirectory = (AllTheGuides, guideDirectory) => {

    for (let item of AllTheGuides) {
      if (item.node.fields.slug === "/" + guideDirectory) {
        return item.node.frontmatter.title;
      }
    }
  }

  const getAGuide = (AllTheGuides, guideDirectory) => {
    return {
      link: "/" + guideDirectory,
      title: getTitleForGuideDirectory(AllTheGuides, guideDirectory),
      children: getChildrenForGuideDirectory(AllTheGuides, guideDirectory)
    }
  }


  const OmniItems = [
    {
      link: "/",
      title: "Pantheon Docs",
      children: [

    {
      link: "/get-started",
      title: "Get Started",
    },
        {
          link: "/decoupled",
          title: "Front-End Sites",
          children: [
            getAGuide(AllGuides.allGuides.edges, "guides/decoupled/wp-nextjs-frontend-starters"),
            getAGuide(AllGuides.allGuides.edges, "guides/decoupled/wp-backend-starters"),
          ]
        },

    {
      link: "/certification",
      title: "WebOps Certification",
      children: CertificationItems
    },
        {
      link: "/get-started",
      title: "about",
    },
      ]
    },
  ];

  // merge the guide items with the OmniItems

  function findSubMenuItemsToUse(maximumParent, NestedItems) {
    for (let item of NestedItems) {
      if (item.link === maximumParent) {
        return item;
      } else if (item.subItems && item.subItems.length > 0) {
        const found = findSubMenuItemsToUse(maximumParent, item.subItems);
        if (found) return found;
      }
    }
    return undefined;
  }

  const activeParent = [findSubMenuItemsToUse(maximumParent, OmniItems)];

  const OmniLinks = turnItemsIntoLinks(activeParent, activePage);

  return (
    <SidebarNav
      slot="guide-menu"
      title={OmniLinks[0].linkContent}
      links={OmniLinks[0].links} />
  )
}


export default OmniSidebarNav;
