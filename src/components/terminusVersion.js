import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

function TerminusVersion({ text }) {
  const { allTerminusReleasesJson } = useStaticQuery(graphql`
    query {
      allTerminusReleasesJson(sort: { fields: [published_at], order: DESC }) {
        edges {
          node {
            tag_name
          }
        }
      }
    }
  `);

  const latestRelease = allTerminusReleasesJson.edges[0].node.tag_name;

  return (
    <h2>
      {text} {latestRelease}
    </h2>
  );
}

export default TerminusVersion;
