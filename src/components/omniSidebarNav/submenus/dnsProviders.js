import { getGuideDirectory, simpleLink } from './../helpers';

const dnsProviders = () => {
  return {
    link: '/dns-providers',
      title: 'DNS Providers',
        children: [
          // This page doesn't have a title???
          simpleLink('/configure-dns'),

          simpleLink('/1-and-1', '1 & 1'),
          simpleLink('/route53', 'Amazon Route 53'),
          simpleLink('/cloudflare', 'Cloudflare'),
          simpleLink('/dns-made-easy', 'DNS Made Easy'),
          simpleLink('/dreamhost'),
          simpleLink('/dyn'),
          simpleLink('/enom'),
          simpleLink('/gandi'),
          simpleLink('/godaddy'),
          simpleLink('/google'),
          simpleLink('/namecheap'),
          simpleLink('/network-solutions'),
        ],
    }

};

export default dnsProviders;
