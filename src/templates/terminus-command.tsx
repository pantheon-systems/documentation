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
  const options: any = Object.keys(command.definition.options).map(
    function (key) {
      return [String(key), command.definition.options[key]];
    }
  );
  options.forEach((option: any) => {
    option.shift();
  });

  options.sort((a: any, b: any) => (a[0].name > b[0].name ? 1 : -1));
  options.sort(function (a: any, b: any) {
    return a[0].name.localeCompare(b[0].name);
  });

  return (
    <DocsPage
      activePage={"/terminus/commands"}
      header={
        <>
          <div className="pds-overline-m pds-pad-block-xs">Command</div>
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
                      <code
                        key={`${i}-pre`}
                        className="pds-mar-inline-end-2xs"
                      >
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
                {options.map((option: any, i: number) => {
                  return (
                    <tr key={`${i}-${option}`}>
                      <td key={`${option}-name`}>{option[0].name}</td>
                      <td key={`${option}-desc`}>
                        {option[0].description}
                      </td>
                    </tr>
                  );
                })}
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
