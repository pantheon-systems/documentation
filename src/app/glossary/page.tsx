"use server";

import Link from "next/link";
import showdown from "showdown";
import Layout from "@/components/layout";
import { Container } from "@/components/ui/pds-re-export";
import { DocsSidebarLayout } from "@/components/pds-middleware/docs-sidebar-layout";
import { MOBILE_MENU_BREAKPOINT } from "@/constants";
import HeaderBody from "@/components/common/header-body";
import { TOC } from "@/components/common/toc";
import { getGlossaryPageData } from "@/lib/glossary";
import { generateMetadataFromUri } from "@/lib/site-metadata";

const converter = new showdown.Converter();

export default async function GlossaryPage() {
  const { allDefs, letters } = await getGlossaryPageData();

  return (
    <Layout containerWidth="standard">
      <Container width={"standard"} className="pds-spacing-pad-block-end-4xl">
        <DocsSidebarLayout
          gridGap="standard"
          mobileMenuMaxWidth={MOBILE_MENU_BREAKPOINT}
          sidebarLocation="right"
          sidebarMobileLocation="after"
          sidebarWidth="standard"
        >
          <div slot="content" className="doc article glossary">
            <HeaderBody
              title="Glossary"
              description="A collection of terms and definitions through Pantheon's Documentation"
              subtitle={""}
              slug={""}
              contributors={[]}
              featured={false}
              editPath={""}
              reviewDate={""}
            ></HeaderBody>
            <div className="pds-spacing-mar-block-start-m pds-spacing-mar-block-end-4xl">
              <p>
                This page dynamically displays all defined terms in the Pantheon
                Documentation project.
              </p>

              {letters.map((index) => (
                <span key={index}>
                  {allDefs.filter((def) => {
                    return JSON.stringify(def.letter).match(index);
                  }).length > 0 ? (
                    <span>
                      <Link
                        href={`#${index.toLowerCase()}`}
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
                    </span>
                  ) : null}

                  {allDefs
                    .filter((def) => {
                      //console.log("Now rendering ", def.title, def) //For Debugging
                      return def.letter.toUpperCase() === index.toUpperCase();
                    })
                    .map(({ from, slug, title, definition }, idx) => (
                      <span key={`${title.replace(/ +/g, "-")}-${idx}`}>
                        <dl key={`${title.replace(/ +/g, "-")}`}>
                          <dt
                            key={`${title.replace(/ +/g, "-")}-header-${idx}`}
                            id={title.toLowerCase().replace(/ +/g, "-")}
                            //   name={title.toLowerCase().replace(/ +/g, "-")}
                            className="glossary__term"
                          >
                            <Link
                              href={`#${title.toLowerCase().replace(/ +/g, "-")}`}
                              className="glossary__term-link"
                            >
                              {title.charAt(0).toUpperCase() + title.slice(1)}
                            </Link>
                          </dt>
                          <dd
                            dangerouslySetInnerHTML={{
                              __html: converter
                                .makeHtml(definition)
                                .replace(/<a href="\/(.+?)">/g, "<a href=/$1>"),
                            }}
                          />
                          {from.length > 0 ? (
                            <>
                              Excerpt from:{" "}
                              <Link
                                data-pcc-link-type="glossary"
                                key={`${title}-reference`}
                                href={`/${slug}`}
                              >
                                {from}
                              </Link>
                            </>
                          ) : null}
                        </dl>
                      </span>
                    ))}
                </span>
              ))}
            </div>
          </div>
          <div slot="sidebar">
            <TOC title="Contents" />
          </div>
        </DocsSidebarLayout>
      </Container>
    </Layout>
  );
}

export async function generateMetadata() {
  return {
    ...generateMetadataFromUri({
      title: "Glossary",
      description:
        "A collection of terms and definitions through Pantheon's Documentation",
    }),
    authors: [],
  };
}
