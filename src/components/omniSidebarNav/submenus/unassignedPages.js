import { getGuideDirectory, simpleLink } from './../helpers';

const unassignedPages = () => {
  return {
    link: '/asdfasdfasdf',
    title: 'Unassigned',
    children: [
      // simpleLink('/search/'),

    ],
  }

};

export default unassignedPages;
