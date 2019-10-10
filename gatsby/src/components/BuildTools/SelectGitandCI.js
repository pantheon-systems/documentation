import React from 'react';
import Form from 'react-bootstrap/Form';
import { usePersistedState } from '../utils';

export default function SelectGitandCI() {

    const [gitProvider, setGitProvider] = usePersistedState('pantheonGitProvider', 'GitHub');
    const [CIProvider, setCIProvider] = usePersistedState('pantheonCIProvider', 'CircleCI');

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
            <Form.Control as="select" value={gitProvider} onChange={function (event) {
                switch (event.target.value) {
                    case 'BitBucket':
                        setGitProvider('BitBucket');
                        setCIProvider('BitBucket Pipelines');
                        break;
                    case 'GitLab':
                        setGitProvider('GitLab');
                        setCIProvider('GitLab CI/CD');
                        break;
                    default:
                        setGitProvider('GitHub');
                        setCIProvider('CircleCI');
                        break;
                }
            }}>
                {
                    GitOptions.map(function (GitOption) {
                        return <option key={GitOption.value} value={GitOption.value}>{GitOption.label}</option>
                    })
                }
            </Form.Control>
        </Form.Group>
    );
}