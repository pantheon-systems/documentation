import React from "react"
import ghlogo from "../../../source/images/github-logo.svg"
import circlelogo from "../../../source/images/circleci-logo.svg"
import composerlogo from "../../../source/images/composer-logo.svg"
import pantheonlogo from "../../../source/images/official-plugin.svg"

const BuildTools= ({ })  => {
  return (
    <>
    <div className="flex-panel-group">
      <div className="flex-panel-item">
        <div className="flex-panel-body" style={{justifyContent: 'space-around'}}>
          <div className="flex-panel-title">
            <h4 className="info" style={{marginTop: "10px", fontSize: "larger"}}>Git Provider</h4>
            <div className="pantheon-official">
              <img alt="GitHub Logo" src={ghlogo} className="mainTopic-info__plugin-image" style={{maxWidth: "40px", marginBottom: "10px!important"}} />
              <p className="pantheon-official"></p>
            </div>
          </div>
          <p className="topic-info__description" >
            <p style={{fontSize: '14px', marginTop: '1rem'}}>An external Git provider that provides cloud storage of Git repositories along with features to manage those repsitories, such as issues, pull requests, a web editor, etc. This is where the WebOps team works and commits source code for the project.</p>
            <p style={{fontSize: '14px'}}>The supported providers are:</p>
            <ul>
                <li><a href="https://github.com" className="external">GitHub</a></li>
                <li><a href="https://about.gitlab.com" className="external">GitLab</a></li>
                <li><a href="https://bitbucket.org/product/" className="external">BitBucket</a></li>
              </ul>
          </p>
        </div>
      </div>
      <div className="flex-panel-item">
        <div className="flex-panel-body" style={{justifyContent: 'space-around'}}>
          <div className="flex-panel-title">
            <h4 className="info" style={{marginTop: "10px", fontSize: "larger"}}>Continuous Integration (CI) Service</h4>
            <div className="pantheon-official">
              <img alt="CircleCI Logo" src={circlelogo} className="main-topic-info__plugin-image" style={{maxWidth: "40px", marginBottom: "10px!important"}} />
              <p className="pantheon-official"></p>
            </div>
          </div>
          <p className="topic-info__description" >
            <p style={{fontSize: '14px', marginTop: '1rem'}}>A Continuous Integration service that provides hosted solutions to run automated tests for a project, allowing them to be run triggered by a change on the Git provider. This is where the source code is turned into production ready code and where automated tests are run.</p>
            <p style={{fontSize: '14px'}}>The supported providers are:</p>
            <ul>
              <li><a href="https://circleci.com" className="external">CircleCI</a></li>
              <li><a href="https://about.gitlab.com/product/continuous-integration/" className="external">GitLab</a></li>
              <li><a href="https://bitbucket.org/product/features/pipelines" className="external">BitBucket</a></li>
            </ul>
          </p>
        </div>
      </div>
    </div>
    <div className="flex-panel-group">
    <div className="flex-panel-item">
        <div className="flex-panel-body">
          <div className="flex-panel-title">
            <h4 className="info" style={{marginTop: "10px", fontSize: "larger"}}>Composer</h4>
            <div className="pantheon-official">
              <img alt="Composer Logo" src={composerlogo} className="main-topic-info__plugin-image" style={{maxWidth: "40px", marginBottom: "10px!important"}} />
              <p className="pantheon-official"></p>
            </div>
          </div>
          <p className="topic-info__description">
            <p style={{fontSize: '14px', marginTop: '1rem'}}><a href="/docs/composer/" className="external">Composer</a> is a PHP dependency manager that provides an alternative, more modern way to manage the external code used by a project.</p>
            
            <p style={{fontSize: '14px'}}>For example, Composer may be used to install the core CMS and any third-party plugins/modules or themes used by the project.</p>
          </p>
        </div>
      </div>
      <div className="flex-panel-item">
        <div className="flex-panel-body">
          <div className="flex-panel-title">
            <h4 className="info" style={{marginTop: "10px", fontSize: "larger"}}>Pantheon Site</h4>
            <div className="pantheon-official">
              <img alt="Pantheon Logo" src={pantheonlogo} className="main-topic-info__plugin-image" style={{maxWidth: "40px", marginBottom: "10px!important"}} />
              <p className="pantheon-official"></p>
            </div>
          </div>
          <p className="topic-info__description">
            <p style={{fontSize: '14px', marginTop: '1rem'}}>A Pantheon site associated with the project. This is where the code built from the the external Git repository is deployed.</p>
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default BuildTools
