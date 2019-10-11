import React, { useState } from 'react';
import RadioInputGroup from '../RadioInputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './index.css';
import SwitchableTextInput from '../SwitchableTextInput';
import { usePersistedState } from '../utils';
import {
    BuildToolsSelectCMS,
    BuildToolsSelectGitandCI
} from "../BuildTools"

function BuildProjectCreateCommandGenerator() {
    const timestamp = new Date().getTime();
    const [hasPantheonOrg, setHasPantheonOrg] = usePersistedState('pantheonHasOrg',false);
    const [pantheonOrgName, setPantheonOrgName] = usePersistedState('pantheonOrgName','');
    const [hasGitOrg, setHasGitOrg] = usePersistedState('pantheonHasGitOrg',false);
    const [gitOrgName, setGitOrgName] = usePersistedState('pantheonGitOrgName','');
    const [gitProvider, setGitProvider] = usePersistedState('pantheonGitProvider', 'GitHub');
    const [CIProvider, setCIProvider] = usePersistedState('pantheonCIProvider', 'CircleCI');
    const [cms, setCMS] = usePersistedState('pantheonCMS', 'd8');
    const [visibility, setVisibility] = usePersistedState('pantheonGitRepoVisibility','public');
    const [projectName, setProjectName] = usePersistedState('pantheonBuildToolsProjectName',`${gitProvider.toLowerCase()}-${cms}-${Math.floor(timestamp / 100000)}`);
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
                <Row>
                    <Col sm={12} md={6}>
                        <BuildToolsSelectCMS
                            cms={cms}
                            setCMS={setCMS}
                            readOnly={true}
                        />
                    </Col>
                    <Col sm={12} md={6}>
                        <BuildToolsSelectGitandCI 
                            gitProvider={gitProvider}
                            setGitProvider={setGitProvider}
                            CIProvider={CIProvider}
                            setCIProvider={setCIProvider}
                            readOnly={true}
                        />
                    </Col>
                </Row>
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