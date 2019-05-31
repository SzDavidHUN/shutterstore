import React from 'react';
import {Link} from "react-router-dom";
import {CUSTOMER_LOGIN_LINK, MANAGER_LIST_ORDERS, WORKER_LIST_ORDERS} from "../constants/RouterConstants";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-brand">ShutterStore</div>
            <Link className="nav-link" to={CUSTOMER_LOGIN_LINK}>Customer</Link>
            <Link className="nav-link" to={WORKER_LIST_ORDERS}>Worker</Link>
            <Link className="nav-link" to={MANAGER_LIST_ORDERS}>Manager</Link>
        </nav>
    )
}

export default Navbar;
