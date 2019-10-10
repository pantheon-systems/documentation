import React, { useState } from 'react';
import { usePersistedState } from '../utils';
import BuildToolsComponents from './index.js';
import Alert from '../alert';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function StackSelectToolbar () {

    return (
        <>
            <Alert title="Note"  type="info" >
                
                <p>This guide will change depending on which Content Management System, Git/Continuous Integration Provider you are using. Please select from the options below to view a customized version of the guide.</p>
                <hr></hr>
                <Row style={ {marginTop: "1em"} }>
                    <Form>
                        <Col sm={12} md={6}>
                            <BuildToolsComponents.SelectCMS />
                        </Col>
                        <Col sm={12} md={6}>
                            <BuildToolsComponents.SelectGitandCI />
                        </Col>
                    </Form>
                </Row>
            </Alert>
        </>
    );
}

export default StackSelectToolbar;