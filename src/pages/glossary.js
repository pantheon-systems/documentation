import { Link, graphql } from 'gatsby';

import Layout from '../layout/layout';
import HeaderBody from '../components/headerBody';

import React from 'react';
import SEO from '../layout/seo';
import TOC from '../components/toc';
import showdown from 'showdown';

import { Container, SidebarLayout } from '@pantheon-systems/pds-toolkit-react';
// @todo, add omnisidebarnav to this page.
import './styles/glossary.css';

const converter = new showdown.Converter();

const previewFlexPanelItem = {
  flex: '1 46%',
  margin: '0px 0px 15px 15px',
  color: '#333',
};

// Set container width for search and main content.
const containerWidth = 'standard';

class Glossary extends React.Component {
  render() {
    const {
      data: { docsWithDefLists, docsWithDFNs },
    } = this.props;
    //console.log("docsWithDefLists: ", docsWithDefLists) //For Debugging
    //console.log("docsWithDFNs", docsWithDFNs)

    let defLists = [];

    docsWithDefLists.edges.map(({ node }) => {
      const matches = node.rawBody.match(
        /<dt>(.+?)<\/dt>\n\n\s*<dd>\n\n(.+?)\n\n\s*<\/dd>/gim,
      );
      //console.log("Match Title: ", node.frontmatter.title) // For Debugging
      //console.log("match: ", matches) // For Debugging
      if (matches && matches.length) {
        matches.forEach((term) => {
          //console.log("slug: ", node.fields.slug, "slice: ", node.fields.slug.slice(0, 1)),
          defLists.push({
            title: term.match(/<dt>(.*?)<\/dt>/)[1],
            from: node.frontmatter.title,
            slug:
              node.fields.slug.slice(0, 1) === '/'
                ? node.fields.slug.slice(1)
                : node.fields.slug,
            definition: term.match(/<dd>\n\n\s*(.*?)\n\n\s*<\/dd>/)[1],
            letter: term.match(/<dt>(.*?)<\/dt>/)[1][0].toUpperCase(),
          });
        });
      }
    });

    //    defLists.sort((a, b) =>
    //      a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
    //    )
    //    defLists.sort(function(a, b) {
    //      return a.title[0].localeCompare(b.title[0])
    //    })
    //console.log("defLists: ", defLists) // For debugging

    let allDfns = [];

    docsWithDFNs.edges.map(({ node }) => {
      //console.log("rawBody: ", node.rawBody) //For Debugging
      const isDfn = node.rawBody.match(
        /\n.*?<dfn id="(.*?)">(.*?)<\/dfn>.*?\n/g,
      );
      //console.log("isDfn", isDfn) //For Debugging
      if (isDfn && isDfn.length) {
        isDfn.forEach((def) => {
          //console.log("slug: ", node.fields.slug, "slice: ", node.fields.slug.slice(0, 1)),
          allDfns.push({
            title: def.match(/\n.*?<dfn id="(.*?)">(.*?)<\/dfn>.*?\n/)[2],
            from: node.frontmatter.title,
            slug:
              node.fields.slug.slice(0, 1) === '/'
                ? node.fields.slug.slice(1)
                : node.fields.slug,
            definition: def,
            letter: def
              .match(/\n.*?<dfn id="(.*?)">(.*?)<\/dfn>.*?\n/)[1][0]
              .toUpperCase(),
            id: def.match(/\n.*?<dfn id="(.*?)">(.*?)<\/dfn>.*?\n/)[1],
          });
        });
      }
    });
    //    allDfns.sort((a, b) =>
    //      a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
    //    )
    //    allDfns.sort(function(a, b) {
    //      return a.title[0].localeCompare(b.title[0])
    //    })
    //console.log("allDfns: ", allDfns) //For Debugging

    const allDefs = allDfns.concat(defLists);
    allDefs.sort((a, b) =>
      a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1,
    );
    //console.log("allDefs: ", allDefs) //For Debugging

    const letters = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];

    return (
      <Layout containerWidth={containerWidth} footerBorder>
        <SEO
          title="Glossary"
          description="A collection of terms and definitions through Pantheon's Documentation"
        />
        <main id="docs-main" tabindex="-1">
          <Container
            width={containerWidth}
            className="pds-spacing-pad-block-end-4xl"
          >
            <SidebarLayout>
              <article slot="content" className="doc article glossary">
                <HeaderBody
                  title="Glossary"
                  description="A collection of terms and definitions through Pantheon's Documentation"
                />
                <div className="pds-spacing-mar-block-start-m pds-spacing-mar-block-end-4xl">
                  <p>
                    This page dynamically displays all defined terms in the
                    Pantheon Documentation project.
                  </p>

                  {letters.map((index) => (
                    <>
                      {allDefs.filter((def) => {
                        return JSON.stringify(def.letter).match(index);
                      }).length > 0 ? (
                        <>
                          <Link
                            to={`#${index.toLowerCase()}`}
                            className="glossary__letter-link"
                          >
                            <h2
                              key={index}
                              className="tocify-item glossary__letter"
                              id={index.toLowerCase()}
                            >
                              {index}
                            </h2>
                          </Link>
                          <hr />
                        </>
                      ) : null}
                      {allDefs
                        .filter((def) => {
                          //console.log("Now rendering ", def.title, def) //For Debugging
                          return (
                            def.letter.toUpperCase() === index.toUpperCase()
                          );
                        })
                        .map(({ from, slug, title, definition }) => (
                          <>
                            <dl key={title.replace(/ +/g, '-')}>
                              <dt
                                key={`${title.replace(/ +/g, '-')}-header`}
                                id={title.toLowerCase().replace(/ +/g, '-')}
                                name={title.toLowerCase().replace(/ +/g, '-')}
                                className="glossary__term"
                              >
                                <Link
                                  to={`#${title
                                    .toLowerCase()
                                    .replace(/ +/g, '-')}`}
                                  className="glossary__term-link"
                                >
                                  {title.charAt(0).toUpperCase() +
                                    title.slice(1)}
                                </Link>
                              </dt>
                              <dd
                                dangerouslySetInnerHTML={{
                                  __html: converter
                                    .makeHtml(definition)
                                    .replace(
                                      /<a href="\/(.+?)">/g,
                                      '<a href=/$1>',
                                    ),
                                }}
                              />
                              {from.length > 0 ? (
                                <>
                                  Excerpt from:{' '}
                                  <Link
                                    key={`${title}-reference`}
                                    to={`/${slug}`}
                                  >
                                    {from}
                                  </Link>
                                </>
                              ) : null}
                            </dl>
                          </>
                        ))}
                    </>
                  ))}
                </div>
              </article>
              <TOC slot="sidebar" title="Contents" />
            </SidebarLayout>
          </Container>
        </main>
      </Layout>
    );
  }
}

export default Glossary;

export const pageQuery = graphql`
  query DocsWithDefinitions {
    docsWithDFNs: allMdx(
      filter: {
        frontmatter: { title: { ne: "Style Guide" } }
        rawBody: { regex: "/dfn/" }
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
          rawBody
        }
      }
    }
    docsWithDefLists: allMdx(
      filter: {
        frontmatter: { title: { ne: "Style Guide" } }
        rawBody: { regex: "/<dt/" }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
          }
          rawBody
          fields {
            slug
          }
        }
      }
    }
  }
`;
