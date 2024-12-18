import { getGuideDirectory, simpleLink } from './../helpers';

const goLive = () => {
  return {
    link: '/go-live',
    title: 'Going Live',
    children: [
      simpleLink('/go-live', 'Overview'),
      getGuideDirectory('guides/domains', 'Domains'),
      simpleLink('/dns-providers', 'DNS Providers', [
        simpleLink('/1-and-1', '1 & 1'),
        simpleLink('/route53', 'Amazon Route 53'),
        simpleLink('/cloudflare', 'Cloudflare'),
        simpleLink('/dreamhost', 'DreamHost'),
        simpleLink('/dns-made-easy', 'DNS Made Easy'),
        simpleLink('/dyn', 'Dyn'),
        simpleLink('/enom', 'eNom'),
        simpleLink('/gandi', 'Gandi'),
        simpleLink('/godaddy', 'GoDaddy'),
        simpleLink('/namecheap', 'Namecheap'),
        simpleLink('/network-solutions', 'Network Solutions'),
      ]),
      getGuideDirectory('guides/launch', 'Launch'),
      simpleLink('/relaunch', 'Relaunch an existing site'),
      simpleLink('/http-to-https', 'Switching Sites from HTTP to HTTPS'),
    ],
  };
};

export default goLive;
