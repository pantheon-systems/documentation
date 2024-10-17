import { getGuideDirectory, simpleLink } from './../helpers';

const terminus = () => {
  return {
    link: '/terminus',
    title: 'Terminus',
    children: [
      // @todo, copy the order from the terminus template

      simpleLink('/terminus', "Terminus User Manual",
        [
          simpleLink('/terminus', "Introduction"),
          simpleLink('/terminus/install', "Install and Update Terminus"),
          simpleLink('/terminus/examples', "Get Started"),
          simpleLink('/terminus/commands', "Command Directory"),
          simpleLink('/terminus/scripting', "Scripting with Terminus"),
          simpleLink('/terminus/plugins', "Install Plugins"),
          simpleLink('/terminus/directory', "Plugin Directory"),
          simpleLink('/terminus/create', "Create Terminus Plugins"),
          simpleLink('/terminus/configuration', "Terminus Configuration File"),
          simpleLink('/terminus/supported-terminus', "Supported Terminus and PHP Versions"),
          simpleLink('/terminus/updates', "Current Terminus Release, Changelog, and Updates"),
          simpleLink('/terminus/terminus-3-0', "Terminus 3"),
        ]

      ),
      simpleLink('/terminus-demo', "Introduction to Terminus"),
      simpleLink('/terminus-drupal-site-management', "Using Terminus to Create and Update Drupal Sites on Pantheon"),
      simpleLink('/terminus-overview', "Terminus Overview"),
      simpleLink('/terminus/ci/bitbucket', "Authenticate Terminus in a Bitbucket CI Pipeline"),
      simpleLink('/terminus/ci/circleci', "Authenticate Terminus in a CircleCI Pipeline"),
      simpleLink('/terminus/ci/github-actions', "Authenticate Terminus in a GitHub Actions Pipeline"),
      simpleLink('/terminus/ci/gitlab', "Authenticate Terminus in a GitLab Pipeline"),
      simpleLink('/machine-tokens', "Creating and Revoking Machine Tokens"),
    ]
  }

};

export default terminus;
