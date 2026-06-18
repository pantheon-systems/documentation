import Layout from "@/components/layout";
import { DocsSidebarLayout } from "@/components/pds-middleware/docs-sidebar-layout";
import SearchBar from "@/components/header/search-bar";
import HeaderBody from "@/components/common/header-body";

import { CommandType } from "@/components/common/commands/types";
import { Partial } from "@/components/common/partial-component";
import Link from "next/link";
import { Pre } from "@/components/ui/mdx-wrapper/pre";
import { Navbar } from "@/components/common/navbar";

const ContainerDiv = ({ children }: { children: React.ReactNode }) => (
  <div className="content-wrapper">{children}</div>
);

const ContentLayoutType = ({
  children,
  hasTOC,
}: {
  children: React.ReactNode;
  hasTOC: boolean;
}) => {
  if (hasTOC) {
    return (
      <DocsSidebarLayout
        mobileMenuMaxWidth={900}
        sidebarLocation="right"
        sidebarWidth="narrow"
        gridGap="narrow"
        sidebarMobileLocation="after"
      >
        {children}
      </DocsSidebarLayout>
    );
  }

  return <ContainerDiv>{children}</ContainerDiv>;
};

// @TODO relocate this list
// - To a YAML file and use GraphQL to pull data.
// - To a GraphQL query order by frontmatter weight/order/index field.
const items = [
  {
    id: "docs-terminus",
    link: "/terminus",
    title: "Introduction",
  },
  {
    id: "docs-terminus-install",
    link: "/terminus/install",
    title: "Install Terminus",
  },
  {
    id: "docs-terminus-examples",
    link: "/terminus/examples",
    title: "Get Started",
  },
  {
    id: "docs-terminus-commands",
    link: "/terminus/commands",
    title: "Command Directory",
  },
  {
    id: "docs-terminus-scripting",
    link: "/terminus/scripting",
    title: "Scripting with Terminus",
  },
  {
    id: "docs-terminus-plugins",
    link: "/terminus/plugins",
    title: "Install Plugins",
  },
  {
    id: "docs-terminus-directory",
    link: "/terminus/directory",
    title: "Plugin Directory",
  },
  {
    id: "docs-terminus-create",
    link: "/terminus/create",
    title: "Create Terminus Plugins",
  },
  {
    id: "docs-terminus-configuration",
    link: "/terminus/configuration",
    title: "Terminus Configuration File",
  },

  {
    id: "docs-supported-terminus",
    link: "/terminus/supported-terminus",
    title: "Supported Terminus and PHP Versions",
  },

  {
    id: "docs-terminus-updates",
    link: "/terminus/updates",
    title: "Terminus Changelog",
  },

  {
    id: "docs-terminus-terminus-4-0",
    link: "/terminus/terminus-4-0",
    title: "Terminus 4",
  },
];

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
    <Layout containerWidth="standard" excludeSearch={true}>
      <DocsSidebarLayout
        sidebarWidth="narrow"
        gridGap="narrow"
        sidebarLocation="left"
        mobileMenuMaxWidth={1025}
        className="pds-container pds-container--x-wide"
      >
        <div slot="sidebar" className="guide-sidebar">
          <Navbar
            title={"Terminus Command Reference"}
            items={items}
            activePage={"/terminus/commands"}
          />
        </div>

        <div id="docs-main" slot="content" tabIndex={-1}>
          <ContentLayoutType hasTOC={false}>
            <div slot="content">
              <SearchBar />
            </div>
            <main id="docs-main" slot="content" tabIndex={-1}>
              <article className="doc guide-doc-body pds-spacing-pad-block-end-2xl">
                <div className="pds-overline-text pds-spacing-pad-block-xs">
                  Command
                </div>
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
                <h2>Description</h2>
                <p>{command.description}</p>

                <h2>Example Usage</h2>
                <div className="pds-spacing-mar-block-start-l pds-spacing-mar-block-end-4xl">
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

                <div className="pds-spacing-mar-block-end-4xl">
                  {command.usage.map((usage, i) => {
                    if (i !== 0) {
                      return (
                        <span key={i}>
                          <p key={i}>
                            <code
                              key={`${i}-pre`}
                              className="pds-spacing-mar-inline-end-2xs"
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
                <div className="pds-spacing-mar-block-end-4xl">
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
                <Link href="/terminus/commands">Back to all commands</Link>
              </article>
            </main>
          </ContentLayoutType>
        </div>
      </DocsSidebarLayout>
    </Layout>
  );
};
