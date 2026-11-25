import { simpleLink, getGuideDirectory } from "./helpers";

// Pages that set `header.group` are listed in the header's CLI menu under that
// heading. Everything else in this section is only in the sidebar.
const terminusMenu = { group: "Terminus" };
const otherCliMenu = { group: "Other CLIs" };

const terminus = () => {
  return {
    link: "/terminus",
    title: "Command Line Interface (CLI)",
    children: [
      {
        ...simpleLink("/terminus", "Terminus User Manual", [
          simpleLink("/terminus", "Introduction"),
          {
            ...simpleLink("/terminus/install", "Install and Update Terminus"),
            header: terminusMenu,
          },
          simpleLink("/terminus/examples", "Get Started"),
          {
            ...simpleLink("/terminus/commands", "Command Directory"),
            header: terminusMenu,
          },
          simpleLink("/terminus/scripting", "Scripting with Terminus"),
          {
            ...simpleLink("/terminus/plugins", "Install Plugins"),
            header: terminusMenu,
          },
          simpleLink("/terminus/directory", "Plugin Directory"),
          simpleLink("/terminus/create", "Create Terminus Plugins"),
          simpleLink("/terminus/configuration", "Terminus Configuration File"),
          {
            ...simpleLink(
              "/terminus/supported-terminus",
              "Supported Terminus and PHP Versions"
            ),
            header: terminusMenu,
          },
          simpleLink("/terminus/updates", "Terminus Changelog", [
            simpleLink("/terminus/terminus-4-0", "Terminus 4"),
            simpleLink("/terminus/terminus-3-0", "Terminus 3"),
          ]),
        ]),
        header: terminusMenu,
      },
      simpleLink("/personal-access-tokens", "Authentication", [
        simpleLink(
          "/personal-access-tokens",
          "Creating and Revoking Personal Access Tokens"
        ),
        simpleLink("/ssh-keys", "SSH Keys"),
        simpleLink(
          "/terminus/ci/bitbucket",
          "Authenticate Terminus in a Bitbucket CI Pipeline"
        ),
        simpleLink(
          "/terminus/ci/circleci",
          "Authenticate Terminus in a CircleCI Pipeline"
        ),
        simpleLink(
          "/terminus/ci/github-actions",
          "Authenticate Terminus in a GitHub Actions Pipeline"
        ),
        simpleLink(
          "/terminus/ci/gitlab",
          "Authenticate Terminus in a GitLab Pipeline"
        ),
      ]),
      simpleLink("/customer-scheduled-cron-jobs", "Scheduled Cron Jobs"),

      { ...getGuideDirectory("guides/wp-cli", "WP-CLI"), header: otherCliMenu },
      {
        ...getGuideDirectory("guides/drush", "Drush (the Drupal CLI)"),
        header: otherCliMenu,
      },
    ],
  };
};

export default terminus;
