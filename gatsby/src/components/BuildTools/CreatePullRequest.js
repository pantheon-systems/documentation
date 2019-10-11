import React from 'react';
import { usePersistedState } from '../utils';
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import {
    CMS,
    GitProvider,
    CIProvider
} from './index';

function Introduction () {

    const [cms] = usePersistedState('pantheonCMS', 'd8');
    const [gitProvider] = usePersistedState('pantheonGitProvider', 'GitHub');
    const [CIProvider] = usePersistedState('pantheonCIProvider', 'CircleCI');

    return (
        <>
            <MDXProvider>
                <MDXRenderer>
                    
                </MDXRenderer>
            </MDXProvider>
        </>
    );
}

export default Introduction;