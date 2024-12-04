import { getGuideDirectory, simpleLink } from './../helpers';

const security = () => {
  return {
    link: '/guides/security',
    title: 'Security',
    children: [
      simpleLink('/guides/security', 'Security Overview'),
      getGuideDirectory('guides/secure-development'),
      getGuideDirectory('guides/secrets', 'Secrets Manager'),
      simpleLink('/custom-certificates', 'Custom Certificates'),
      simpleLink('/certificate-bundles', 'Certificate Bundles'),
      simpleLink('/clamav', 'ClamAV'),
      simpleLink('/drupal-security-patches', 'Drupal Security Patches'),
    ],
  };
};

export default security;
