import React, {Fragment} from 'react';
import SelectCMS from './SelectCMS';
import SelectGitandCI from './SelectGitandCI';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function StackSelectToolbar ({showText=true}) {

    return (
        <Fragment>
            <div className="alert alert-info">
            {showText ? (<Fragment><p>This guide changes depending on which Content Management System and Git/Continuous Integration providers you are using. Use the options below to customize the guide to your preferred stack.</p>
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
        </Fragment>
    );
}

export default StackSelectToolbar;