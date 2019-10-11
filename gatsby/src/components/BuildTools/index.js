import React from 'react';
import {usePersistedState} from '../utils';

import CreatePullRequest from './CreatePullRequest.js';
export {CreatePullRequest as BuildToolsCreatePullRequest};

import StackSelectToolbar from './StackSelectToolbar.js';
export {StackSelectToolbar as BuildToolsStackSelectToolbar};

import SelectCMS from './SelectCMS.js';
export {SelectCMS as BuildToolsSelectCMS};

import SelectGitandCI from './SelectGitandCI.js';
export {SelectGitandCI as BuildToolsSelectGitandCI};

export const BuildToolsComponents =  {
    CreatePullRequest,
    StackSelectToolbar,
    SelectCMS,
    SelectGitandCI
};

export default BuildToolsComponents;

export function CMS () {
    const [cms] = usePersistedState('pantheonCMS', 'd8');
    return (<>{cms}</>);
}

export function CIProvider () {
    const [CIProvider] = usePersistedState('pantheonCIProvider', 'CircleCI');
    return (<>{CIProvider}</>);
}

export function GitProvider () {
    const [gitProvider] = usePersistedState('pantheonGitProvider', 'GitHub');
    return (<>{gitProvider}</>);
}