import React, { useContext, Fragment } from 'react';
import RadioInputGroup from '../RadioInputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './index.css';
import SwitchableTextInput from '../SwitchableTextInput';
import { usePersistedState } from '../utils';
import SelectCMS from '../BuildTools/SelectCMS';
import SelectGitandCI from '../BuildTools/SelectGitandCI';
import { BuildToolsStateContext } from '../BuildTools/BuildToolsContextProvider';

function BuildProjectCreateCommandGenerator() {
    // Global state
    const BuildToolsState = useContext(BuildToolsStateContext);
    const timestamp = new Date().getTime();
    // Local state
    const [hasPantheonOrg, setHasPantheonOrg] = usePersistedState('pantheonHasOrg',false);
    const [pantheonOrgName, setPantheonOrgName] = usePersistedState('pantheonOrgName','');
    const [hasGitOrg, setHasGitOrg] = usePersistedState('pantheonHasGitOrg',false);
    const [gitOrgName, setGitOrgName] = usePersistedState('pantheonGitOrgName','');
    const [visibility, setVisibility] = usePersistedState('pantheonGitRepoVisibility','public');

    const [projectName, setProjectName] = usePersistedState('pantheonBuildToolsProjectName',`${BuildToolsState.GitProvider.toLowerCase()}-${BuildToolsState.CMS}-${Math.floor(timestamp / 100000)}`);
    let projectCreateCommand = `terminus build:project:create \\\n${BuildToolsState.CMS} \\\n${projectName}`;
    if ( BuildToolsState.GitProvider !== 'GitHub' ) {
        projectCreateCommand += ` \\\n--git=${BuildToolsState.GitProvider.toLowerCase()}`;
    }
    if ( visibility === 'private' ) {
        projectCreateCommand += ( BuildToolsState.GitProvider !== 'GitLab' ) ? ' \\\n--visibility=private' : ' \\\n--visibility=internal';
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
                    inputHelpText={(<Fragment>The organization machine name or UUID of the organization, which can be retrieved from Terminus with <code className="language-bash">terminus org:list</code></Fragment>)}
                />
                <SwitchableTextInput
                    slug='git-org-switchable-input'
                    switchValue={hasGitOrg}
                    switchLabel={`Will the project be associated with a ${BuildToolsState.GitProvider} organization?`}
                    switchChange={() => setHasGitOrg(!hasGitOrg)}
                    inputValue={gitOrgName}
                    inputLabel={`${BuildToolsState.GitProvider} Organization`}
                    inputChange={event => setGitOrgName(event.target.value)}
                />
                <Row>
                    <Col sm={12} md={6}>
                        <SelectCMS />
                    </Col>
                    <Col sm={12} md={6}>
                        <SelectGitandCI />
                    </Col>
                </Row>
                <RadioInputGroup
                    name='visibility'
                    value={visibility}
                    slug='select-repo-visibility'
                    handleChange={(event) => setVisibility(event.target.value)}
                    label={`Should the project be public or private on ${BuildToolsState.GitProvider}?`}
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