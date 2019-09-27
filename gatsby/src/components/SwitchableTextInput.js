import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Switch from './Switch';

const SwitchableTextInput = ({
    slug = 'react-switchable-input',
    switchValue,
    switchLabel,
    switchChange,
    inputValue,
    inputLabel,
    inputChange,
    inputHelpText = null
}) => {
    return (
        <Form.Group as={Row} controlId={slug}>
            <Switch
                isOn={switchValue}
                handleToggle={switchChange}
                slug={`${slug}-switch`}
                text={switchLabel}
                required={true}
            />
            {
            switchValue ? (
                <>
                    <Col sm={12}>
                        <Form.Label>
                            {inputLabel}
                        </Form.Label>
                    </Col>
                    <Col sm={12}>
                        <Form.Control
                            required
                            type="text"
                            onChange={inputChange}
                            value={inputValue}
                        />
                    </Col>
                    {
                        ( null !== inputHelpText ) ? (
                            <Col sm={12}>
                                <small>
                                    {inputHelpText}
                                </small>
                            </Col>
                        ) : null
                    }
                </>
            ) : null
            }
        </Form.Group>
    );
}

export default SwitchableTextInput;