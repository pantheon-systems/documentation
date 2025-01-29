import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { subYears, parseISO, isAfter } from 'date-fns';

import { headline1, headline2, headline3 } from './releaseHeadlines';

const shortcodes = {
  h1: headline1,
  h2: headline2,
  h3: headline3,
};

const Releases = ({ data }) => {
  const oneYearAgo = subYears(new Date(), 1);

  // Safe Filtering: Ensure `published_at` exists before filtering
  const filteredReleases = data.allTerminusReleasesJson.edges.filter(
    (release) => {
      const publishedDate = release.node.published_at;
      return publishedDate && isAfter(parseISO(publishedDate), oneYearAgo);
    },
  );

  return (
    <>
      {filteredReleases.length > 0 ? (
        filteredReleases.map((release, i) => (
          <div key={i}>
            <h3 className="toc-ignore" id={release.node.tag_name}>
              {release.node.tag_name}
            </h3>
            <MDXProvider components={shortcodes}>
              <MDXRenderer>
                {release.node.fields.markdownBody.childMdx.body}
              </MDXRenderer>
            </MDXProvider>
            <hr />
          </div>
        ))
      ) : (
        <p>No recent releases found.</p>
      )}
    </>
  );
};

export default (props) => (
  <StaticQuery
    query={graphql`
      query {
        allTerminusReleasesJson(sort: { fields: [published_at], order: DESC }) {
          edges {
            node {
              id
              tag_name
              published_at
              fields {
                markdownBody {
                  childMdx {
                    body
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => <Releases data={data} {...props} />}
  />
);
