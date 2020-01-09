import React from 'react'
import { BuildToolsContextProvider } from './src/components/BuildTools/BuildToolsContextProvider';

/*
 * Add global scripts to ensure Bootstrap and jQuery JS is included
 */
export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script key="jquery" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.1/jquery.min.js" />,
    <script key="bootstrap" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" />,
    <script key="twitter" src="https://platform.twitter.com/widgets.js" />
  ])
}

export const wrapPageElement = ({ element }) => {
  return <BuildToolsContextProvider>{element}</BuildToolsContextProvider>
}