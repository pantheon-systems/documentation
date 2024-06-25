import CertificationItems from "./submenus/certification";
import getGuideDirectory from "./getGuideDirectory";

const getOmniItems = () => {

  const OmniItems = [

    {
      link: "/get-started",
      title: "Get Started",
    },
    {
      link: "/decoupled",
      title: "Front-End Sites",
      children: [
        getGuideDirectory("guides/decoupled/wp-nextjs-frontend-starters"),
        getGuideDirectory("guides/decoupled/wp-backend-starters"),
      ]
    },
    {
      link: "/certification",
      title: "WebOps Certification",
      children: CertificationItems
    },
        {
      link: "/get-started",
      title: "about",
    },
      ]
  ;

  return OmniItems;
}

export default getOmniItems;
