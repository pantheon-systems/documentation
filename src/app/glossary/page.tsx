"use server";

import Link from "next/link";
import showdown from "showdown";
import { DocsPage } from "@/components/docs-page";
import HeaderBody from "@/components/common/header-body";
import { getGlossaryPageData } from "@/lib/glossary";
import { generateMetadataFromUri } from "@/lib/site-metadata";

const converter = new showdown.Converter();

export default async function GlossaryPage() {
  const { allDefs, letters } = await getGlossaryPageData();

  return (
    <DocsPage
      activePage="/glossary"
      hasTOC
      header={
        <HeaderBody
          title="Glossary"
          description="A collection of terms and definitions through Pantheon's Documentation"
          subtitle={""}
          slug={""}
          contributors={[]}
          featured={false}
          editPath={""}
          reviewDate={""}
        />
      }
    >
      <div className="doc article glossary pds-pad-block-end-4xl">
      <div className="pds-mar-block-start-m pds-mar-block-end-4xl">
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
    </DocsPage>
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
