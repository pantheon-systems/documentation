import { getGuideDirectory, simpleLink } from './../helpers';

const dnsProviders = () => {
  return {
    link: '/dns-providers',
      title: 'DNS Updates',
        children: [
          // Should these be the parent, and DNS the child?
          simpleLink('/go-live', 'Going live'),
          simpleLink('/relaunch', 'Relaunch an existing site'),
          // This page doesn't have a title???
          simpleLink('/configure-dns', 'Configure DNS'),
          simpleLink('/1-and-1', '1 & 1'),
          simpleLink('/route53', 'Amazon Route 53'),
          simpleLink('/cloudflare', 'Cloudflare'),
          simpleLink('/dns-made-easy', 'DNS Made Easy'),
          simpleLink('/dreamhost', 'DreamHost'),
          simpleLink('/dyn', 'Dyn'),
          simpleLink('/enom', 'eNom'),
          simpleLink('/gandi', 'Gandi'),
          simpleLink('/godaddy', 'GoDaddy'),
          simpleLink('/namecheap', 'Namecheap'),
          simpleLink('/network-solutions', 'Network Solutions'),
          // Does this still exist?
          simpleLink('/google', 'Google Cloud DNS'),
        ],
    }

};

export default dnsProviders;
