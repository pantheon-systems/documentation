import { getGuideDirectory, simpleLink } from './../helpers';

const about = () => {
  return {
    link: '/contribute',
    title: 'About our Docs',
    children: [
      simpleLink('/contribute'),
      simpleLink('/code-of-conduct'),
      simpleLink('/pantheon-community'),
      // Should this page be here?
      simpleLink('/trainers'),
      simpleLink('/style-guide', 'Style Guide', [

        simpleLink('/doc-template', 'Template Docs Page'),
      ]),

      simpleLink('/oss-support-levels'),
      simpleLink('/'),

      simpleLink('/faq'),
      simpleLink('/glossary/'),
      simpleLink('/search/'),
      simpleLink('/inclusive-language'),





    ]
  }

};

export default about;
