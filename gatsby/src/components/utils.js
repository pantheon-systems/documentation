import { useState, useEffect } from 'react';

export function usePersistedState(key, defaultValue) {
    // If we are building Gatsby
    if ( typeof window === 'undefined' ) {
        const [state, setState] = useState(defaultValue);
        return [state, setState];
    }

    const [state, setState] = useState(
        () => JSON.parse(localStorage.getItem(key)) || defaultValue
    );
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    return [state, setState];
}