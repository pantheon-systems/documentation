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

  // Filter releases that are newer than one year
  const filteredReleases = data.allTerminusReleasesJson.edges.filter(
    (release) =>
      isAfter(
        parseISO(release.node.fields.markdownBody.childMdx.body.published_at),
        oneYearAgo,
      ),
  );

  return (
    <>
      {filteredReleases.map((release, i) => (
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
      ))}
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
