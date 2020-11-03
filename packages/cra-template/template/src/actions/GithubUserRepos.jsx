import * as constants from '../constants';

export function fetchGithubUserReposStart ()  {
    return {
        type: constants.FETCH_GITHUB_USER_REPO_START
    }
}

export function fetchGithubUserRepos (GithubUserName)  {
    return {
        type: constants.FETCH_GITHUB_USER_REPO_DETAILS,
        GithubUserName
    }
}

export function fetchGithubUserReposFulfilled (GithubUserReposDetails)  {
    return {
        type: constants.FETCH_GITHUB_USER_REPO_FULFILLED,
        GithubUserReposDetails
    }
}

export function fetchGithubUserReposCancel ()  {
    return {
        type: constants.FETCH_GITHUB_USER_REPO_CANCEL,
    }
}

export function fetchGithubUserReposFailed ()  {
    return {
        type: constants.FETCH_GITHUB_USER_REPO_FAILED,
    }
}

