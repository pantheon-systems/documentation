import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
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
            subtitle
          }
        }
      }
    }
      }
    `
  );

  console.log(AllGuides);

  // loop over all guides and create a list of links

  const GuideItems = AllGuides.allGuides.edges.map(({ node }) => {
    return {
      link: node.fields.slug,
      title: node.frontmatter.subtitle,
    }
  }
  );
  const guideToGet = "guides/decoupled/wp-nextjs-frontend-starters"
  const AllGuideItems = [];
  for (let item of AllGuides.allGuides.edges) {
    console.log(item.node.fields.guide_directory);
    if (item.node.fields.guide_directory === guideToGet) {
      AllGuideItems.push({
        link: item.node.fields.slug,
        title: item.node.frontmatter.subtitle,
      });
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
          link: "/guides/decoupled/wp-nextjs-frontend-starters",
          title: "WordPress + Next.js Frontend Starter for Front-End Sites",
          children: AllGuideItems
        },
    {
      link: "/guides",
      title: "Guides",
      children: GuideItems
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


