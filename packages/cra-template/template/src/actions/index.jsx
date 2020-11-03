import * as constants from '../constants';

export function loginStart (username,password)  {
    return {
        type: constants.LOGIN_START,
        user: {username,password}
    }
}

export function loginFullfilled ()  {
    return {
        type: constants.LOGIN_FULLFILLED
    }
}

export function logout (from )  {
    return {
        type: constants.LOGOUT,
        from
    }
}



