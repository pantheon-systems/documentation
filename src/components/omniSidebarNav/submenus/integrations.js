import { getGuideDirectory, simpleLink } from './../helpers';

const integrations = () => {
  return {
    link: '/asdfasdfasdf',
    // better name for this section needed
    title: 'Futher Integrations',
    children: [
      getGuideDirectory('guides/pagerduty', 'PagerDuty'),
      getGuideDirectory('guides/accessibility'),
      simpleLink('/deploybot'),


    ],
  }

};

export default integrations;
