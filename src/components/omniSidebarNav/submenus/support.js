import { getGuideDirectory, simpleLink } from './../helpers';

const support = () => {
  return {
    link: '/guides/support',
    title: 'Support and Troubleshooting',
    children: [
      getGuideDirectory('guides/support', 'Support'),
      simpleLink('/resetting-passwords', 'Resetting Passwords'),
      simpleLink('/ssh-keys', 'SSH Keys'),
      getGuideDirectory('guides/professional-services'),
      simpleLink('/oss-support-levels', 'Open Source Support Levels'),
      simpleLink('/basic-troubleshooting'),
      simpleLink('/timeouts'),
      simpleLink('/debug-connections'),
      getGuideDirectory('guides/errors-and-server-responses'),
      getGuideDirectory(
        'guides/disaster-recovery',
        'Disaster Recovery Playbook',
      ),
      simpleLink('/mime-types'),
      simpleLink('/http-to-https'),
      // @todo, this page is not loading??
      simpleLink('/debug-slow-performance'),
      simpleLink('/bots-and-indexing'),
      simpleLink('/load-and-performance-testing'),
      simpleLink('/load-testing-with-blazemeter'),
      simpleLink(
        '/modules-plugins-known-issues',
        'Modules and plugins with known issues',
      ),
    ],
  };
};

export default support;
