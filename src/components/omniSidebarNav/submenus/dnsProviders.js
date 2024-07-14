import { getGuideDirectory, simpleLink } from './../helpers';

const dnsProviders = () => {
  return {
    link: '/dns-providers',
      title: 'DNS Providers',
        children: [
          /*
                  1 & 1
              Amazon Route 53
              Cloudflare
              DNS Made Easy
              DreamHost
              Dyn
              Enom
              Gandi
              GoDaddy
              Google
              Namecheap
              Network Solutions
          */
          simpleLink('/1-and-1', '1 & 1'),
          simpleLink('/route53', 'Amazon Route 53'),
          simpleLink('/cloudflare', 'Cloudflare'),
          simpleLink('/dns-made-easy', 'DNS Made Easy'),


        ],
    }

};

export default dnsProviders;
