import { getGuideDirectory, simpleLink } from './../helpers';

const unassignedPages = () => {
  return {
    link: '/search',
    title: 'Unassigned',
    children: [simpleLink('/search')],
  };
};

export default unassignedPages;
