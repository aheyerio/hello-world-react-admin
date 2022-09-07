import React from 'react';
import {User} from "../models/user";
import {Link} from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";

// in this nav declaration we are saying that a user of type user should be
// passed to it or of type null
const Nav = (props: { user: User | null}) => {
    const logout = async () => {
        await axios.post('logout')
    }

    return (
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Company name</a>
            <ul className="navbar-nav">
                <div className="nav-item text-nowrap">
                    <Link to={'/profile'}
                          className="px-2 text-white text-decoration-none">{props.user?.first_name} {props.user?.last_name}</Link>
                    <Link to={'/login'}
                          className="px-2 text-white text-decoration-none"
                          onClick={logout}
                    > Sign out</Link>
                </div>
            </ul>

        </header>
    );
};

export default connect((state: {user: User}) => ({
    user: state.user
}))(Nav);