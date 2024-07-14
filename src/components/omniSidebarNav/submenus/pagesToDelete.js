import { getGuideDirectory, simpleLink } from './../helpers';

const dnsProviders = () => {
  return {
    link: '/asdfasdf',
    title: 'Pages to Delete',
    children: [
      simpleLink('/workshops'),


      // This is a really small page.
      simpleLink('/add-site-clone'),

    ]
  }

};

export default dnsProviders;
