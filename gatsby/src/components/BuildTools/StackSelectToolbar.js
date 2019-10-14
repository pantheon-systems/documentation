import React, {Fragment} from 'react';
import SelectCMS from './SelectCMS';
import SelectGitandCI from './SelectGitandCI';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function StackSelectToolbar ({showText=true}) {

    return (
        <div className="alert alert-info">
            {showText ? (<Fragment><p>This guide changes depending on which Content Management System, Git/Continuous Integration Provider you are using. Change the options below to update the customized version of the guide.</p>
            <hr></hr></Fragment>) : null }
            <Row style={ {marginTop: "1em"} }>
                <Form>
                    <Col sm={12} md={6}>
                        <SelectCMS />
                    </Col>
                    <Col sm={12} md={6}>
                        <SelectGitandCI />
                    </Col>
                </Form>
            </Row>
        </div>
    );
}

export default StackSelectToolbar;