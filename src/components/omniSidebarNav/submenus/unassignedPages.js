import { getGuideDirectory, simpleLink } from './../helpers';

const unassignedPages = () => {
  return {
    link: '/asdfasdfasdf',
    title: 'Unassigned',
    children: [
      simpleLink('/search/'),
      simpleLink('/'),
      getGuideDirectory('guides/accessibility'), // This belongs in the learning center
    ],
  };
};

export default unassignedPages;
