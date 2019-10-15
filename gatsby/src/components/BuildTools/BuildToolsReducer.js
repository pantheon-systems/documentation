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
            newState.PRLanguage = 'Pull Request';
            break;
        case 'gitlab':
            newState.GitProvider = 'GitLab';
            newState.CIProvider = 'GitLab CI/CD';
            newState.PRLanguage = 'Merge Request';
            break;
        case 'bitbucket':
        case 'pipelines':
            newState.GitProvider = 'BitBucket';
            newState.CIProvider = 'BitBucket Pipelines';
            newState.PRLanguage = 'Pull Request';
            break
        case 'drupal':
        case 'drupal 8':
        case 'd8':
            newState.CMS = 'Drupal 8';
            newState.ContribLanguage = 'contrib modules';
            break;
        case 'wordpress':
        case 'wp':
            newState.CMS = 'WordPress';
            newState.ContribLanguage = 'third-party plugins';
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
    PRLanguage: 'Pull Request',
    ContribLanguage: 'contrib modules',
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