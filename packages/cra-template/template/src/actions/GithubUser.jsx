import * as constants from '../constants';

export function fetchGithubUserStart ()  {
    return {
        type: constants.FETCH_GITHUB_USER_START,
    }
}

export function fetchGithubUser (GithubUserName)  {
    return {
        type: constants.FETCH_GITHUB_USER_DETAILS,
        GithubUserName
    }
}

export function fetchGithubUserFulfilled (GithubUserDetails)  {
    return {
        type: constants.FETCH_GITHUB_USER_DETAILS_FULFILLED,
        GithubUserDetails
    }
}

export function fetchGithubUserCancel ()  {
    return {
        type: constants.FETCH_GITHUB_USER_DETAILS_CANCEL,
    }
}

export function fetchGithubUserFailed ()  {
    return {
        type: constants.FETCH_GITHUB_USER_DETAILS_FAILED,
    }
}

