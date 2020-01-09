import React, {useContext} from 'react';
import Form from 'react-bootstrap/Form';
import { BuildToolsStateContext, BuildToolsDispatchContext } from './BuildToolsContextProvider';

export default function SelectCMS({
    readOnly=false
}) {

    const BuildToolsState = useContext(BuildToolsStateContext);
    const BuildToolsDispatch = useContext(BuildToolsDispatchContext);

    const cmsOptions = [
        {
            label: "Drupal 8",
            value: "Drupal 8"
        },
        {
            label: "WordPress",
            value: "WordPress"
        }
    ];

    return (
        <Form.Group controlId="selectCMS">
            <Form.Label>Content Management System</Form.Label>
            <Form.Control
                as="select"
                onChange={(event) => BuildToolsDispatch({ type: event.target.value })}
                value={BuildToolsState.CMS}
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