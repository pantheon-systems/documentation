import React from 'react'
import WPapiRef from '../../../source/data/wpApiRef.json'
import Accordion from './accordion/'
import './commands/style.css'

const WordPressAPIRef = (props) => {
    const object = WPapiRef[`${props.object}`]
    //console.log("API Object: ", object)
    const getArgs = object.endpoints[0]
    const postArgs = object.endpoints[1]
    const getKeys = Object.keys(getArgs.args)
    const postKeys = Object.keys(postArgs.args)
    //console.log(WPPostData.endpoints)

    return (
        <>
        <h2>{props.object.charAt(0).toUpperCase() + props.object.slice(1)}</h2>
        <Accordion
            title="GET Arguments"
            id={`${props.object}-get`}
            icon="gears"
        >
        <table className="table table-commands table-bordered table-striped">
            <thead>
                <tr>
                    <th>Argument</th>
                    <th>Type</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {Object.values(getArgs.args)
                .map((arg, index) => (
                    <tr
                        key={getKeys.indexOf(getKeys[index])}
                        id={getKeys[index]}
                    >
                    <td>{getKeys[index]}</td>
                    <td>{arg.type}</td>
                    <td>{arg.description ? arg.description : "None provided"}</td>
                    </tr>
                    ))
                }
            </tbody>
        </table>
        </Accordion>

        <Accordion
            title="POST Arguments"
            id={`${props.object}-post`}
            icon="gears">
        <table className="table table-commands table-bordered table-striped">
            <thead>
                <tr>
                    <th>Argument</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Required</th>
                </tr>
            </thead>
            <tbody>
                {Object.values(postArgs.args)
                .map((arg, index) => (
                    <tr
                        key={postKeys.indexOf(postKeys[index])}
                        id={postKeys[index]}
                    >
                        <td>{postKeys[index]}</td>
                        <td>
                            {typeof arg.type === "string" ? arg.type : arg.type.join(', ')}
                        </td>
                        <td>{arg.description ? arg.description : "None provided"}</td>
                        {arg.required ? <td>✓</td> : null}
                    </tr>
                    ))
                }
            </tbody>
        </table>
        </Accordion>
    </>
    )
}

export default WordPressAPIRef