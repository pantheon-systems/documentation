import React from 'react'
import WPPostData from '../../../source/data/wp/posts.json'

const WordPressAPIRef = (props) => {
    const getArgs = WPPostData.endpoints[0]
    //const postArgs = WPPostData.endpoints[1]
    const keys = Object.keys(getArgs.args)
    console.log("keys: ", keys) // For Debugging

    return (
        <>
        <ul>
            {Object.values(getArgs.args).map((arg, index) => (
                <li
                    key={keys.indexOf(keys[index])}
                    id={keys[index]}
                >
                    {keys[index]} - {arg.description}
                </li>
                ))
            }
        </ul>
    </>
    )
}

export default WordPressAPIRef