import * as constants from '../constants'



export function landingReducer(state  = { githubUserName: "",githubUserLoading:false , githubUserDetails :{}, githubUserReposLoading :false,
    githubUserReposDetails : []}, action) {
    switch (action.type) {
        case constants.FETCH_GITHUB_USER_START :
            return {...state  ,githubUserLoading:true };
        case constants.FETCH_GITHUB_USER_DETAILS :
            return {...state  ,githubUserName : action.GithubUserName, githubUserLoading:false };
        case constants.FETCH_GITHUB_USER_DETAILS_FULFILLED :
            return {...state , githubUserDetails : action.GithubUserDetails ,githubUserLoading:false};
        case constants.FETCH_GITHUB_USER_DETAILS_CANCEL :
            return {...state , githubUserLoading:false};
        case constants.FETCH_GITHUB_USER_DETAILS_FAILED :
            return {...state , githubUserLoading:false};
        case constants.FETCH_GITHUB_USER_REPO_START :
            return {...state  ,githubUserReposLoading:true };
        case constants.FETCH_GITHUB_USER_REPO_DETAILS :
            return {...state  ,githubUserName : action.GithubUserName, githubUserReposLoading:false };
        case constants.FETCH_GITHUB_USER_REPO_FULFILLED :
            return {...state , githubUserReposDetails : action.GithubUserReposDetails ,githubUserReposLoading:false};
        case constants.FETCH_GITHUB_USER_REPO_CANCEL :
            return {...state , githubUserReposLoading:false};
        case constants.FETCH_GITHUB_USER_REPO_FAILED :
            return {...state , githubUserReposLoading:false};
        default:
            return state;
    }

}
