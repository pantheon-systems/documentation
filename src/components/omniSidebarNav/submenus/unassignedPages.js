import { getGuideDirectory, simpleLink } from './../helpers';

const unassignedPages = () => {
  return {
    link: '/asdfasdfasdf',
    title: 'Unassigned',
    children: [
      simpleLink('/search/'),
      // This should be deprecated/archived see https://github.com/pantheon-systems/documentation/pull/9251
      getGuideDirectory('guides/edge-integrations', 'Edge Integrations'),
    ],
  };
};

export default unassignedPages;
