import { connect } from 'react-redux';
import { Header } from "../components/Header.jsx";

import * as actions from '../actions/';

export function mapStateToProps(state) {
    return {
        pathname: state.router.location.pathname,
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        logout: (from ) => dispatch(actions.logout(from)),

    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
