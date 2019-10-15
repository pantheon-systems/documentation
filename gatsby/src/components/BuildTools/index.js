import React, {useContext, Fragment} from 'react';

import { BuildToolsStateContext, BuildToolsDispatchContext } from './BuildToolsContextProvider.js';
export { BuildToolsStateContext, BuildToolsDispatchContext };

import StackSelectToolbar from './StackSelectToolbar.js';
export {StackSelectToolbar as BuildToolsStackSelectToolbar};

import WorkflowDiagram from './WorkflowDiagram';
export {WorkflowDiagram as BuildToolsWorkflowDiagram};

import SelectCMS from './SelectCMS.js';
export {SelectCMS as BuildToolsSelectCMS};

import SelectGitandCI from './SelectGitandCI.js';
export {SelectGitandCI as BuildToolsSelectGitandCI};

export function CMS () {
    const BuildToolsState = useContext(BuildToolsStateContext);
    return (
        <Fragment>{BuildToolsState.CMS}</Fragment>
    );
}

export function CIProvider () {
    const BuildToolsState = useContext(BuildToolsStateContext);
    return (
        <Fragment>{BuildToolsState.CIProvider}</Fragment>
    );
}

export function GitProvider () {
    const BuildToolsState = useContext(BuildToolsStateContext);
    return (
        <Fragment>{BuildToolsState.GitProvider}</Fragment>
    );
}