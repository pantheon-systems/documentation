import React, { useState } from 'react';
import https from "https";
import Accordion from "./accordion";

function updateGitHubLatestVersion(repository = '', setStateCallback, organization = 'pantheon-systems') {
  if (repository.length === 0) {
    return;
  }
  const url = `https://api.github.com/repos/${organization}/${repository}/releases/latest`;
  https.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      body = JSON.parse(body);
      setStateCallback(body.tag_name);
    });
  });
}

function InstallBuildTools () {
  const [terminusVersion, setTerminusVersion] = useState('^2');
  const [buildToolsVersion, setBuildToolsVersion] = useState('^2');

  updateGitHubLatestVersion('terminus', setTerminusVersion);
  updateGitHubLatestVersion('terminus-build-tools-plugin', setBuildToolsVersion);

  return (
    <Accordion title="Install Build Tools" id="install-build-tools" icon="lightbulb">
      <ol>
        <li key="step-1">
          <p>
            Install <a href="https://getcomposer.org" rel="nofollow noopener noreferrer external">Composer</a>. You can verify installation by running <code className="language-text">composer --version</code>
          </p>
        </li>
        <li key="step-2">
          <p>
            Install the most recent release of <a href="/terminus/">Terminus</a>, version <code className="language-text">{terminusVersion}</code>:
          </p>
          <div className="gatsby-highlight" data-language="bash"><pre className="language-bash"><code className="language-bash"><span className="token function">curl</span> -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar <span className="token operator">&amp;&amp;</span> php installer.phar <span className="token function">install</span></code></pre></div>
          <p>
            You can verify installation and your current version by running <code className="language-text">terminus --version</code>
          </p>
        </li>
        <li key="step-3">
          <p>
            <a href="/ssh-keys/">Add an SSH key</a> within your User Dashboard to enable passwordless access and avoid authentication prompts. Otherwise, provide your Pantheon Dashboard credentials when prompted.
      </p>
        </li>
        <li key="step-4">
          <p><a href="https://dashboard.pantheon.io/machine-token/create" rel="nofollow noopener noreferrer external">Generate a Pantheon machine token</a>, then authenticate Terminus:</p>
          <div className="gatsby-highlight" data-language="bash"><pre className="language-bash"><code className="language-bash">terminus auth:login --machine-token<span className="token operator">=</span><span className="token operator">&lt;</span>machine-token<span className="token operator">&gt;</span></code></pre></div>
        </li>
        <li key="step-5">
          <p>
            Create the <code className="language-text">$HOME/.terminus/plugins</code> directory if it does not already exist:
      </p>
          <div className="gatsby-highlight" data-language="bash"><pre className="language-bash"><code className="language-bash"><span className="token function">mkdir</span> -p <span className="token environment constant">$HOME</span>/.terminus/plugins</code></pre></div>
        </li>
        <li key="step-6">
          <p>
            Install the <a href="https://github.com/pantheon-systems/terminus-build-tools-plugin" rel="nofollow noopener noreferrer external">Terminus Build Tools Plugin</a>:</p><div className="gatsby-highlight" data-language="bash"><pre className="language-bash"><code className="language-bash">composer create-project --no-dev -d <span className="token environment constant">$HOME</span>/.terminus/plugins pantheon-systems/terminus-build-tools-plugin:^{buildToolsVersion}</code></pre></div>
        </li>
        <li key="step-7">
          <p>
            Optionally, <a href="https://github.com/login/oauth/authorize?client_id=78a2ba87f071c28e65bb" rel="nofollow noopener noreferrer external">authorize CircleCI on GitHub</a> if you plan to use those services.
      </p>
          <p>
            If you are redirected to the CircleCI homepage, you have already authorized the service for your GitHub account. Nice! Way to be ahead of the game.
      </p>
        </li>
      </ol>
    </Accordion>
  )
}

export default InstallBuildTools;
