import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const RadioInputGroup = ({
    name = 'radioGroup',
    label = 'Select a value',
    value,
    slug = 'react-radio-group',
    handleChange,
    options = [],
    colSize = 3
}) => {
    return (options.length) ? (
        <fieldset className='react-radio-group' id={`${slug}-wrap`}>
            <Form.Group as={Row}>
                <Col sm={12}>
                    <Form.Label as="legend">
                        {label}
                    </Form.Label>
                </Col>
                {
                    options.map(obj =>{ 
                        return (
                            <Col key={`${obj.id}-col`} sm={colSize}>
                                <Form.Check
                                    type="radio"
                                    label={obj.label}
                                    value={obj.value}
                                    key={`${obj.id}-input`}
                                    name={name}
                                    id={obj.id}
                                    checked={value === obj.value}
                                    onChange={handleChange}
                                />
                            </Col>
                        )
                     })
                }
            </Form.Group>
        </fieldset>
    ) : null;
};

export default RadioInputGroup;