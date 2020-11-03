import * as constants from '../constants'



export function loginReducer(state  = { loggedIn:false , from : null }, action) {
    switch (action.type) {
        case constants.LOGIN_FULLFILLED :
            return {...state ,loggedIn:true};
        case constants.LOGOUT :
            return {...state ,loggedIn:false , from : action.from };
        default:
            return state;
    }
}

