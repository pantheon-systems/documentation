const React = require("react");
const { BuildToolsContextProvider } = require('./src/components/BuildTools/BuildToolsContextProvider');

// custom typefaces
require("prismjs/themes/prism-okaidia.css")

// Code block line numbering
require("prismjs/plugins/line-numbers/prism-line-numbers.css")

// Code block shell prompt
require("prismjs/plugins/command-line/prism-command-line.css")

// Previous version scripts and styles
// require("../source/docs/assets/js/main.js")

// // TOC generator
require("tocbot/dist/tocbot.css")
require("tocbot/dist/tocbot.min.js")

require("./src/styles/global.css")

exports.wrapPageElement = ({ element, props }) => {
    const isBuildTools = props.path.includes('/guides/build-tools');
    if ( isBuildTools ) {
        return <BuildToolsContextProvider>{element}</BuildToolsContextProvider>
    } else {
        return <React.Fragment>{element}</React.Fragment>
    }
}