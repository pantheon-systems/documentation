import React, { useState } from 'react';
import RadioInputGroup from '../RadioInputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './index.css';
import SwitchableTextInput from '../SwitchableTextInput';

function BuildProjectCreateCommandGenerator() {
    const timestamp = new Date().getTime();
    const [hasPantheonOrg, setHasPantheonOrg] = useState(false);
    const [pantheonOrgName, setPantheonOrgName] = useState('');
    const [hasGitOrg, setHasGitOrg] = useState(false);
    const [gitOrgName, setGitOrgName] = useState('');
    const [gitProvider, setGitProvider] = useState('GitHub');
    const [cms, setCMS] = useState('d8');
    const [visibility, setVisibility] = useState('public');
    const [projectName, setProjectName] = useState(`${gitProvider}-${cms}-${Math.floor(timestamp / 100000)}`);
    let projectCreateCommand = `terminus build:project:create \\\n${cms} \\\n${projectName}`;
    if ( gitProvider !== 'GitHub' ) {
        projectCreateCommand += ` \\\n--git=${gitProvider.toLowerCase()}`;
    }
    if ( visibility === 'private' ) {
        projectCreateCommand += ( gitProvider !== 'GitLab' ) ? ' \\\n--visibility=private' : ' \\\n--visibility=internal';
    }
    if (hasPantheonOrg && pantheonOrgName.length) {
        projectCreateCommand += ` \\\n--team=${pantheonOrgName}`;
    }
    if (hasGitOrg && gitOrgName.length) {
        projectCreateCommand += ` \\\n--org=${gitOrgName}`;
    }
    return (
        <div id="build-project-create-command-generator">
            <Form>
                <Form.Group as={Row} controlId='project-name-input'>
                    <Col sm={12}>
                        <Form.Label>
                            Project Name
                        </Form.Label>
                    </Col>
                    <Col sm={12}>
                        <Form.Control
                            required
                            type="text"
                            onChange={event => setProjectName(event.target.value)}
                            value={projectName}
                        />
                    </Col>
                </Form.Group>
                <SwitchableTextInput
                    slug='pantheon-org-switchable-input'
                    switchValue={hasPantheonOrg}
                    switchLabel='Should the project be associated with a Pantheon organization?'
                    switchChange={() => setHasPantheonOrg(!hasPantheonOrg)}
                    inputValue={pantheonOrgName}
                    inputLabel='Pantheon Organization'
                    inputChange={event => setPantheonOrgName(event.target.value)}
                    inputHelpText={(<>The organization machine name or UUID of the organization, which can be retrieved from Terminus with <code className="language-bash">terminus org:list</code></>)}
                />
                <SwitchableTextInput
                    slug='git-org-switchable-input'
                    switchValue={hasGitOrg}
                    switchLabel={`Will the project be associated with a ${gitProvider} organization?`}
                    switchChange={() => setHasGitOrg(!hasGitOrg)}
                    inputValue={gitOrgName}
                    inputLabel={`${gitProvider} Organization`}
                    inputChange={event => setGitOrgName(event.target.value)}
                />
                <RadioInputGroup
                    name='cms'
                    value={cms}
                    slug='select-cms'
                    handleChange={(event) => setCMS(event.target.value)}
                    label='Which CMS will the project use?'
                    options={[
                        {
                            "label": "Drupal 8",
                            "value": "d8",
                            "id": "cmsD8"
                        },
                        {
                            "label": "WordPress",
                            "value": "wp",
                            "id": "cmsWP"
                        },
                    ]}
                />
                <RadioInputGroup
                    name='gitProvider'
                    value={gitProvider}
                    slug='select-git-provider'
                    handleChange={(event) => setGitProvider(event.target.value)}
                    label='Which Git/CI provider will the project use?'
                    options={[
                        {
                            "label": "GitHub and CircleCI",
                            "value": "GitHub",
                            "id": "gitProviderGitHub"
                        },
                        {
                            "label": "GitLab",
                            "value": "GitLab",
                            "id": "gitProviderGitLab"
                        },
                        {
                            "label": "BitBucket",
                            "value": "BitBucket",
                            "id": "gitProviderBitBucket"
                        },
                    ]}
                />
                <RadioInputGroup
                    name='visibility'
                    value={visibility}
                    slug='select-repo-visibility'
                    handleChange={(event) => setVisibility(event.target.value)}
                    label={`Should the project be public or private on ${gitProvider}?`}
                    options={[
                        {
                            "label": "Public",
                            "value": "public",
                            "id": "visibilityPublic"
                        },
                        {
                            "label": "Private",
                            "value": "private",
                            "id": "visibilityPrivate"
                        },
                    ]}
                />
            </Form>
            <pre className="language-bash">
                <code className="language-bash">
                    {projectCreateCommand}
                </code>
            </pre>
            <small>
                    The backslash (<code>\</code>) character allows a command to continue on multiple lines and is used here for readability.
            </small>
        </div>
    );
}

export default BuildProjectCreateCommandGenerator;