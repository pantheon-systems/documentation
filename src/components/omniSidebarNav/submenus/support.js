import { getGuideDirectory, simpleLink } from './../helpers';

const support = () => {
  return {
    link: '/guides/support',
    title: 'Support and Troubleshooting',
    children: [
      getGuideDirectory('guides/support', 'Support'),
      simpleLink('/resetting-passwords', 'Resetting Passwords'),
      simpleLink('/ssh-keys', 'SSH Keys'),
      getGuideDirectory('guides/professional-services'),
      simpleLink('/oss-support-levels', 'Open Source Support Levels'),

    ],
  };
};

export default accountManagement;
