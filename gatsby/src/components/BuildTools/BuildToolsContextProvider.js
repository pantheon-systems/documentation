import React, { useReducer, createContext } from "react";
import { initialState, BuildToolsReducer, getPersistedState } from './BuildToolsReducer';

// See https://reactjs.org/docs/context.html
// and https://kentcdodds.com/blog/how-to-use-react-context-effectively/
const BuildToolsStateContext = createContext();
const BuildToolsDispatchContext = createContext();

const BuildToolsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(BuildToolsReducer, initialState, getPersistedState);
    return (
        <BuildToolsStateContext.Provider value={state}>
            <BuildToolsDispatchContext.Provider value={dispatch}>
                {children}
            </BuildToolsDispatchContext.Provider>
        </BuildToolsStateContext.Provider>
    );
}

export {
    BuildToolsContextProvider,
    BuildToolsStateContext,
    BuildToolsDispatchContext
}