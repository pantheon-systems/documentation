import { getGuideDirectory, simpleLink } from './../helpers';

const security = () => {
  return {
    link: '/guides/security',
    title: 'Security',
    children: [
      simpleLink('/guides/security'),
      getGuideDirectory('guides/secrets'),
      simpleLink('/custom-certificates', 'Custom Certificates'),
      getGuideDirectory('guides/secure-development'),
      simpleLink('/clamav', 'ClamAV'),
      simpleLink('/drupal-security-patches'),
      simpleLink('/certificate-bundles'),
    ],
  };
};

export default security;
