import { getGuideDirectory, simpleLink } from './../helpers';

const about = () => {
  return {
    link: '/contribute',
    title: 'About our Docs',
    children: [
      simpleLink('/contribute', "Contribute to the Docs"),
      simpleLink('/code-of-conduct', "Code of Conduct"),
      simpleLink('/pantheon-community', "Pantheon Community"),
      // Should this page be here?
      simpleLink('/trainers', "Trainers"),
      simpleLink('/style-guide', 'Style Guide', [
        simpleLink('/inclusive-language', "Inclusive Language"),
        simpleLink('/doc-template', 'Template Docs Page'),
      ]),
      simpleLink('/oss-support-levels', 'Open Source Support Levels'),
      // simpleLink('/'),

      simpleLink('/faq', "FAQ"),
      // The glossary page doesn't show the sidebar nav.
      simpleLink('/glossary/', "Glossary"),
      // simpleLink('/search/'),






    ]
  }

};

export default about;
