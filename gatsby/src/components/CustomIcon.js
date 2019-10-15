import React from "react"

import ghlogo from "../../../source/images/github-logo.svg";
import circlelogo from "../../../source/images/circleci-logo.svg";
import composerlogo from "../../../source/images/composer-logo.svg";
import pantheonlogo from "../../../source/images/pantheon-logo.svg";
import gitlablogo from "../../../source/images/gitlab-logo.svg";
import bitbucketlogo from "../../../source/images/bitbucket-logo.svg";
import behatLogo from "../../../source/images/behat-logo.svg";
import gitlabRocket from "../../../source/images/gitlab-rocket-icon.svg";
import gitlabStatusRunning from "../../../source/images/gitlab-status-running-icon.svg";
import gitlabCICDLogo from "../../../source/images/gitlab-ci-cd-logo.png";
import bitbucketPipelinesIcon from "../../../source/images/bitbucket-pipelines-icon.svg";

const CustomIcon = ({ icon="", altText="", width="50px", height="50px" }) => {
  let iconSrc;
  icon = icon.toLowerCase();
  switch(icon) {
    case "circleci":
    case "circle":
      iconSrc = circlelogo;
      altText = ( altText.length === 0 ) ? "CircleCI Logo" : altText;
      break;
    case "composer":
      iconSrc = composerlogo;
      altText = ( altText.length === 0 ) ? "Composer Logo" : altText;
      break;
    case "github":
      iconSrc = ghlogo;
      altText = ( altText.length === 0 ) ? "GitHub Logo" : altText;
      break;
    case "gitlab":
      iconSrc = gitlablogo;
      altText = ( altText.length === 0 ) ? "GitLab Logo" : altText;
      break;
    case "gitlab ci/cd":
      iconSrc = gitlabCICDLogo;
      altText = ( altText.length === 0 ) ? "GitLab CI/CD Logo" : altText;
      break;
    case "bitbucket":
      iconSrc = bitbucketlogo;
      altText = ( altText.length === 0 ) ? "BitBucket Logo" : altText;
      break;
    case "pipelines":
    case "bitbucket pipelines":
      iconSrc = bitbucketPipelinesIcon;
      altText = ( altText.length === 0 ) ? "BitBucket Pipelines Logo" : altText;
      break;
    case "gitlab-rocket":
      iconSrc = gitlabRocket;
      altText = ( altText.length === 0 ) ? "Rocket icon" : altText;
      break;
    case "gitlab-status-running":
      iconSrc = gitlabStatusRunning;
      altText = ( altText.length === 0 ) ? "Status running icon" : altText;
      break;
    case "behat":
      iconSrc = behatLogo;
      altText = ( altText.length === 0 ) ? "Behat Logo" : altText;
      break;
    default:
      iconSrc = pantheonlogo;
      altText = ( altText.length === 0 ) ? "Pantheon Logo" : altText;
      break;
  }
  return (
    <span className="icon custom">
      <img alt={altText} src={iconSrc} style={ {maxWidth: width, height: height} } />
    </span>
  )
}
export default CustomIcon
