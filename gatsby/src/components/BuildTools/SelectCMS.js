import React from 'react';
import Form from 'react-bootstrap/Form';

export default function SelectCMS({
    cms,
    setCMS,
    readOnly=false
}) {

    const cmsOptions = [
        {
            label: "Drupal 8",
            value: "d8"
        },
        {
            label: "WordPress",
            value: "wordpress"
        }
    ];

    return (
        <Form.Group controlId="selectCMS">
            <Form.Label>Content Management System</Form.Label>
            <Form.Control
                as="select"
                onChange={(event) => setCMS(event.target.value)} 
                value={cms}
                disabled={readOnly}
            >
                {
                    cmsOptions.map(function(CMSoption) {
                        return <option key={CMSoption.value} value={CMSoption.value}>{CMSoption.label}</option>
                    })
                }
            </Form.Control>
        </Form.Group>
    );
}