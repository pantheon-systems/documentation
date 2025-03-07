import { simpleLink } from './../helpers';

const about = () => {
  return {
    link: '/contribute',
    title: 'About our Docs',
    children: [
      simpleLink('/contribute', 'Contribute to the Docs'),
      simpleLink('/community', 'Pantheon Community', [
        simpleLink('/community', 'Community'),
        simpleLink('/pantheon-community', 'Join'),
        simpleLink('/roadmap', 'Pantheon Roadmap'),
        simpleLink('/code-of-conduct', 'Code of Conduct'),
        simpleLink('/trainers', 'Trainers'),
      ]),
      simpleLink('/style-guide', 'Style Guide', [
        // The glossary page doesn't show the sidebar nav. @todo Fix this.
        simpleLink('/glossary/', 'Glossary'),
        simpleLink('/inclusive-language', 'Inclusive Language'),
        simpleLink('/doc-template', 'Template Docs Page'),
      ]),
    ],
  };
};

export default about;
