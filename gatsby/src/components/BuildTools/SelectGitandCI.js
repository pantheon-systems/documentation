import React, {useContext} from 'react';
import Form from 'react-bootstrap/Form';
import { BuildToolsStateContext, BuildToolsDispatchContext } from './BuildToolsContextProvider.js';

export default function SelectGitandCI({
    readOnly=false
}) {

    const BuildToolsState = useContext(BuildToolsStateContext);
    const BuildToolsDispatch = useContext(BuildToolsDispatchContext);

    const GitOptions = [
        {
            label: "GitHub and CircleCI",
            value: "GitHub"
        },
        {
            label: "GitLab and GitLab CI/CD",
            value: "GitLab"
        },
        {
            label: "BitBucket and Pipelines",
            value: "BitBucket"
        }
    ];

    return (
        <Form.Group controlId="selectGitProvider">
            <Form.Label>Git/Continuous Integration Provider</Form.Label>
            <Form.Control
                as="select"
                value={BuildToolsState.GitProvider}
                disabled={readOnly}
                onChange={(event) => BuildToolsDispatch({ type: event.target.value })}
            >
                {
                    GitOptions.map(function (GitOption) {
                        return <option key={GitOption.value} value={GitOption.value}>{GitOption.label}</option>
                    })
                }
            </Form.Control>
        </Form.Group>
    );
}