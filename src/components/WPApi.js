import React from 'react'
import WPPostData from '../../../source/data/wp/posts.json'
import { First, Get, Map } from 'react-lodash'

const WordPressAPIRef = (props) => {
    const getArgs = WPPostData.endpoints[0]
    //console.log("All getArg entries: ", Object.entries(getArgs.args))
    //const argNames = Object.entries(getArgs.args)
    //console.log("ArgNames: ", argNames)

    const keys = Object.keys(getArgs.args)
    console.log("keys: ", keys)
    const iteratee = (item, index) => <li key={index}>{keys[index]} - {item.description} </li>
    console.log("iteratee = ", iteratee)

    return (
        <>
        <ul>
        {Object.values(getArgs.args).map((item, index) => (
                <li key={index}>
                    {keys[index]} - {item.description}
                </li>
        ))
        }
        </ul>
    </>
    )
}



export default WordPressAPIRef