import releaseNoteCategoriesObject from "../../source/releasenotescategories/releaseNoteCategories.json"





export const theFunction = function () {



  const NewThings = {
  }

  releaseNoteCategoriesObject.categories.forEach(category => {
    NewThings[category.slug] = category;
  });

  console.log(NewThings);

  return NewThings;


};

export const otherStuff = "other stuff";

export const oldReleaseNoteCategories = {


  "action-required": {
    "slug": "action-required",
    "displayName": "Action Required",
    "color": "red",
    "description": "Requires customer to act in order to avoid disruption"
  },
  "drupal": {
    "slug": "drupal",
    "displayName": "Drupal",
    "color": "black",
    "description": "Tailored for updates specific to the Drupal content management system, helping Drupal users stay informed about platform changes that directly impact their workflows"
  },
  "new-feature": {
    "slug": "new-feature",
    "displayName": "New Feature",
    "color": "green",
    "description": "Consolidates information about both new features and improvements, providing users with insights into enhancements that contribute to a better overall experience"
  },
  "front-end-sites": {
    "slug": "front-end-sites",
    "displayName": "Front-End Sites",
    "color": "purple",
    "description": "Focuses on updates related to Front-End Site (FES) enhancements, ensuring that developers and designers stay informed about changes affecting how they use the product"
  },
  "infrastructure": {
    "slug": "infrastructure",
    "displayName": "Infrastructure",
    "color": "black",
    "description": "Details changes related to the underlying technology and architecture of the Pantheon platform, providing insights into changes that may impact performance and reliability"
  },
  "security": {
    "slug": "security",
    "displayName": "Security",
    "color": "red",
    "description": "Addresses security-related updates, emphasizing the importance of staying informed about changes aimed at maintaining a secure and protected environment for users"
  },
  "tools-apis": {
    "slug": "tools-apis",
    "displayName": "Tools & APIs",
    "color": "black",
    "description": "Keeps users informed about updates related to tools and APIs, helping developers understand changes that may impact their workflows and integrations"
  },
  "wordpress": {
    "slug": "wordpress",
    "displayName": "WordPress",
    "color": "black",
    "description": "Tailored for updates specific to the WordPress content management system, helping WordPress users stay informed about platform changes that directly impact their workflows"
  },
  "performance": {
    "slug": "performance",
    "displayName": "Performance",
    "color": "black",
    "description": "Highlights updates focused on optimizing the speed, efficiency, and overall performance of the Pantheon platform, giving users insights into improvements that enhance user experience"
  },
  "user-interface": {
    "slug": "user-interface",
    "displayName": "User interface",
    "color": "black",
    "description": "Highlights updates related to changes in the user interface, ensuring that designers, marketers, and other users are aware of alterations to the visual and interactive elements of the platform"
  },
  "account-management": {
    "slug": "account-management",
    "displayName": "Account Management",
    "color": "black",
    "description": "Covers finance and billing-related updates, allowing billing and finance managers to track changes affecting their financial aspects"
  },
  "policy": {
    "slug": "policy",
    "displayName": "Policy",
    "color": "gray",
    "description": "Communicates updates related to platform policies, ensuring users are aware of any changes in rules or guidelines that may impact their usage"
  },
  "content-management": {
    "slug": "content-management",
    "displayName": "Content Management",
    "color": "gray",
    "description": "Include changes relevant to managing digital content on the Pantheon platform, ensuring users stay informed about updates related to content creation, editing, and relevant tools"
  },
  "deprecated": {
    "slug": "deprecated",
    "displayName": "Deprecated",
    "color": "red",
    "description": "Reserved for updates indicating the phasing out or discontinuation of specific features or functionalities"
  },
  "events": {
    "slug": "events",
    "displayName": "Events",
    "color": "gray",
    "description": "Highlights updates related to special events, promotions, or limited-time occurrences on the Pantheon platform, keeping users informed about time-sensitive opportunities"
  },
  "general": {
    "slug": "general",
    "displayName": "General",
    "color": "gray",
    "description": "Serves as a catch-all for updates that don't neatly fit into specific categories, offering a broad overview of general changes on the Pantheon platform"
  },
  "issue-bug": {
    "slug": "issue-bug",
    "displayName": "Issue/Bug",
    "color": "gray",
    "description": "Merges information about issues and bugs into a unified category, allowing users to easily identify and understand the current status and steps taken to address reported problems"
  },
  "migration": {
    "slug": "migration",
    "displayName": "Migration",
    "color": "gray",
    "description": "Reserved for updates related to migrations, ensuring users are informed about changes affecting the movement of data and content within the Pantheon platform"
  },
  "integration": {
    "slug": "integration",
    "displayName": "Integration",
    "color": "gray",
    "description": "Addresses updates related to system integration, helping IT and tech leads understand changes relevant to connecting Pantheon with other tools and services",
    "_comment-from-Rachel": "I think we should remove this as a duplicate of the Tools/APIs category"
  },
  "platform": {
    "slug": "platform",
    "displayName": "Platform",
    "color": "gray",
    "description": "Offers general updates about the Pantheon platform, providing users with a comprehensive overview of changes that influence the overall system",
    "_comment-from-Rachel": "I think we should remove this as a duplicate of the Infrastructure category"
  },
  "documentation" : {
    "slug": "documentation",
    "displayName": "Documentation",
    "color": "gray",
    "description": "Communicates substantive changes to docs.pantheon.io",
    "_comment-from-Rachel": "Review needed: New category not yet reviewed/approved by Ingrid or design team",
    "_another_comment-from-Rachel": "We should require any new category to go through a review panel which includes design team, since too many tags can reduce usability of the feature and duplicate categories can cause confusion for intended usage."
  }
};
