import React, {useContext} from "react"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './style.css'
import { BuildToolsStateContext } from '../BuildToolsContextProvider';
import AnimatedArrow from '../../AnimatedArrow';
import CustomIcon from '../../CustomIcon';
import ExternalLink from '../../externalLink';


const WorkflowDiagram = () => {
  const BuildToolsState = useContext(BuildToolsStateContext);
  const {GitProvider, CIProvider, CMS} = BuildToolsState;
  const pluginsOrModules = (CMS === 'WordPress' ? 'plugins' : 'modules');
  const pullRequestOrMergeRequest = (GitProvider === 'GitLab' ? 'merge request' : 'pull request');
  const CIIcon = CIProvider.toLowerCase();
  const gitIcon = GitProvider.toLowerCase();
  
  return (
    <div id="build-tools-workflow-diagram">
      <Row className="color">
        <Col sm={12} md="auto">
          <CustomIcon icon={gitIcon} width="75px" height="75px" />
          <p>In this workflow, only files unique to the project are tracked on {GitProvider}.</p>
          <p>Non-custom code, such as {CMS} core and third-party {pluginsOrModules}, are ignored.</p>
          <p>The allows your team to use popular {GitProvider} features, such as issues and {pullRequestOrMergeRequest}s, that are not available in the Pantheon dashboard.</p>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md="auto">
          <AnimatedArrow direction="down" />
        </Col>
      </Row>
      <Row className="color">
        <Col sm={12} md={6}>
          <CustomIcon icon={CIIcon} width="75px" height="75px" />
        </Col>
        <Col sm={12} md={6}>
          <CustomIcon icon="composer" width="75px" height="75px" />
        </Col>
      </Row>
      <Row className="color">
        <Col sm={12}>
          <p>{CIProvider} then builds a production artifact and deploys the fully-built site to Pantheon.</p>
          <p><ExternalLink text="Composer" link="https://getcomposer.org" /> is used to download PHP dependencies, such as {CMS} core and third-party {pluginsOrModules}.</p>
          <p>Other build steps, such as minifying production assets, also occurs at this stage.</p>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md="auto">
          <AnimatedArrow direction="down" />
        </Col>
      </Row>
      <Row className="color">
        <Col sm={12} md="auto">
          <CustomIcon icon="pantheon" width="75px" height="75px" />
          <p>The Pantheon site contains all of the code needed for production.</p>
          <p>This includes all items ignored on {GitProvider}, such as {CMS} core and third-party {pluginsOrModules}.</p>
          <p>In this workflow, code should not be comitted directly to Pantheon. Instead, all code changes should be made on {GitProvider} and deployed to Pantheon via {CIProvider}</p>
          <p>Code changes made to the master branch of {GitProvider} will be deployed to the dev environment on Pantheon.</p>
          <p>Code changes submitted as a {pullRequestOrMergeRequest} on {GitProvider} will be deployed to a Pantheon multidev environment.</p>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md="auto">
          <AnimatedArrow direction="down" />
        </Col>
      </Row>
      <Row className="color">
        <Col sm={12} md={6}>
          <CustomIcon icon={CIIcon} width="75px" height="75px" />
        </Col>
        <Col sm={12} md={6}>
          <CustomIcon icon="behat" width="75px" height="75px" />
        </Col>
      </Row>
      <Row className="color">
        <Col sm={12} md="auto">
          <p>After the build artifact is deployed to Pantheon, {CIProvider} runs automated tests, such as Behat, against the Pantheon environment.</p>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md="auto">
          <AnimatedArrow direction="down" />
        </Col>
      </Row>
      <Row className="color">
        <Col sm={12} md="auto">
          <CustomIcon icon={gitIcon} width="75px" height="75px" />
          <p>The results of the automated tests from {CIProvider} are then reported back to {GitProvider}.</p>
        </Col>
      </Row>
    </div>
  )
}

export default WorkflowDiagram
