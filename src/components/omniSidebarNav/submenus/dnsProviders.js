import { getGuideDirectory, simpleLink } from './../helpers';

// @todo, rename this function and file to something like "goingLive" or "golive"
const dnsProviders = () => {

  return {
    link: '/go-live',
      title: 'Going Live',
        children: [
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
        ],
    }
};

export default dnsProviders;
