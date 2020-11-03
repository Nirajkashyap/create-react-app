
import { connect } from 'react-redux';

import * as actions from '../actions/';
import Login from "../components/Login";

export function mapStateToProps(state) {
    return {
        loggedIn:state.loginReducer.loggedIn,
        from : state.loginReducer.from
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        login: (username , password ) => dispatch(actions.loginStart(username,password))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
