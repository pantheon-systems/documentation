const BuildToolsReducer = (state, action) => {
    const actionType = action.type.toLowerCase();
    const hasBrowserWindow = ( typeof window !== 'undefined' );
    let newState = {...state};
    switch(actionType) {
        case 'git':
        case 'github':
        case 'circle':
        case 'circleci':
            newState.GitProvider = 'GitHub';
            newState.CIProvider = 'CircleCI';
            break;
        case 'gitlab':
            newState.GitProvider = 'GitLab';
            newState.CIProvider = 'GitLab CI/CD';
            break;
        case 'bitbucket':
        case 'pipelines':
            newState.GitProvider = 'BitBucket';
            newState.CIProvider = 'BitBucket Pipelines';
            break
        case 'drupal':
        case 'drupal 8':
        case 'd8':
            newState.CMS = 'Drupal 8';
            break;
        case 'wordpress':
        case 'wp':
            newState.CMS = 'WordPress';
            break;
        default:
            throw new Error('Invalid Build Tools Context Action Type')
    }
    if ( hasBrowserWindow ) {
        for (let [key] of Object.entries(newState)) {
            localStorage.setItem(`Pantheon_${key}`, JSON.stringify(newState[key]));
        }
    }
    return newState;
};

const initialState = {
    GitProvider: 'GitHub',
    CIProvider: 'CircleCI',
    CMS: 'Drupal 8',
};

const getPersistedState = (initialState) => {
    if ( typeof window === 'undefined' ) {
        return initialState;
    }

    let persistedState = {};

    for (let [key] of Object.entries(initialState)) {
        persistedState[key] = JSON.parse(localStorage.getItem(`Pantheon_${key}`)) || initialState[key]
    }

    return persistedState;
};

export {
    BuildToolsReducer,
    initialState,
    getPersistedState
};