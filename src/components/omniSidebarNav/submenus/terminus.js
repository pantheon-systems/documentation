import { getGuideDirectory, simpleLink } from './../helpers';

const terminus = () => {
  return {
    link: '/terminus',
    title: 'Terminus',
    children: [
      // @todo, copy the order from the terminus template
      simpleLink('/terminus'),
      simpleLink('/terminus-demo'),
      simpleLink('/terminus-drupal-site-management'),
      simpleLink('/terminus-overview'),
      simpleLink('/terminus/ci/bitbucket'),
      simpleLink('/terminus/ci/circleci'),
      simpleLink('/terminus/ci/github-actions'),
      simpleLink('/terminus/ci/gitlab'),
      simpleLink('/terminus/commands'),
      simpleLink('/terminus/configuration'),
      simpleLink('/terminus/create'),
      simpleLink('/terminus/directory'),
      simpleLink('/terminus/examples'),
      simpleLink('/terminus/install'),
      simpleLink('/terminus/plugins'),
      simpleLink('/terminus/scripting'),
      simpleLink('/terminus/supported-terminus'),
      simpleLink('/terminus/terminus-3-0'),
      simpleLink('/terminus/updates'),
    ]
  }

};

export default terminus;
