import React from 'react';
import { usePersistedState } from '../utils';
import BuildToolsComponents from './index.js';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function StackSelectToolbar ({showText=true}) {

    const [gitProvider, setGitProvider] = usePersistedState('pantheonGitProvider', 'GitHub');
    const [CIProvider, setCIProvider] = usePersistedState('pantheonCIProvider', 'CircleCI');
    const [cms, setCMS] = usePersistedState('pantheonCMS', 'd8');

    return (
        <div className="alert alert-info">
            {showText ? (<><p>This guide changes depending on which Content Management System, Git/Continuous Integration Provider you are using. Change the options below to update the customized version of the guide.</p>
            <hr></hr></>) : null }
            <Row style={ {marginTop: "1em"} }>
                <Form>
                    <Col sm={12} md={6}>
                        <BuildToolsComponents.SelectCMS
                            cms={cms}
                            setCMS={setCMS}
                        />
                    </Col>
                    <Col sm={12} md={6}>
                        <BuildToolsComponents.SelectGitandCI 
                            gitProvider={gitProvider}
                            setGitProvider={setGitProvider}
                            CIProvider={CIProvider}
                            setCIProvider={setCIProvider}
                        />
                    </Col>
                </Form>
            </Row>
        </div>
    );
}

export default StackSelectToolbar;