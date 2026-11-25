import { DocsPage } from "@/components/docs-page";
import HeaderBody from "@/components/common/header-body";

import { CommandType } from "@/components/common/commands/types";
import { Partial } from "@/components/common/partial-component";
import Link from "next/link";
import { Pre } from "@/components/ui/mdx-wrapper/pre";

export const TerminusCommandTemplate = ({
  command,
  slug,
}: {
  command: CommandType;
  slug: string;
}) => {
  const options = Object.values(command.definition.options).sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <DocsPage
      isArticle
      activePage={"/terminus/commands"}
      header={
        <>
          <p className="pds-overline-s pan-docs-page-header__eyebrow">
            Command
          </p>
          <HeaderBody
            title="Terminus Command Reference"
            subtitle={`terminus ${command.name}`}
            description=""
            slug={slug}
            contributors={[]}
            featured={false}
            editPath={""}
            reviewDate={""}
          />
        </>
      }
    >
      <article className="doc guide-doc-body pds-pad-block-end-2xl">
        <div className="pds-prose">
          <h2>Description</h2>
          <p>{command.description}</p>

          <h2>Example Usage</h2>
          <div className="pds-mar-block-start-l pds-mar-block-end-4xl">
            {/* <pre className="language-bash">
              <code className="language-bash">
                terminus {command.usage[0].replace(/\[|\]/g, "")}
              </code>
            </pre> */}
            <Pre className="language-bash">
              <code className="language-bash">
                terminus {command.usage[0].replace(/\[|\]/g, "")}
              </code>
            </Pre>
          </div>

          <div className="pds-mar-block-end-4xl">
            {command.usage.map((usage, i) => {
              if (i !== 0) {
                return (
                  <span key={i}>
                    <p key={i}>
                      <code key={`${i}-pre`} className="pds-mar-inline-end-2xs">
                        {usage
                          .replace(/\[|\]/g, "")
                          .replace(/(?!^)\s\b[A-Z][a-z]\w*.+/g, "")}
                      </code>{" "}
                      {usage
                        .replace(/\[|\]/g, "")
                        .match(/(?!^)\b[A-Z][a-z]*\b.+/)}
                    </p>
                    <hr className="commandHr" />
                  </span>
                );
              }
            })}
          </div>

          <h2>Options</h2>
          <div className="pds-mar-block-end-4xl">
            <table>
              <thead>
                <tr>
                  <th>Option</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {options.map((option) => (
                  <tr key={option.name}>
                    <td>{option.name}</td>
                    <td>{option.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Partial file={`terminus/${slug}.md`} />
        </div>
        <Link href="/terminus/commands">Back to all commands</Link>
      </article>
    </DocsPage>
  );
};
