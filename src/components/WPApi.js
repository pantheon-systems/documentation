import React from 'react'
import WPPostData from '../../../source/data/wp/posts.json'
import { First, Get, Map } from 'react-lodash'

const WordPressAPIRef = (props) => {
    const getArgs = WPPostData.endpoints[0]
    console.log(Object.entries(getArgs.args))
    return (
        <>
        <ul>
            <Map collection={getArgs.args} iteratee={i => <li key={i.key}> {i.name} - {i.description} </li>} />
        </ul>
    </>
    )
}

export default WordPressAPIRef