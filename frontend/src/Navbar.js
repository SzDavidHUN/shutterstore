import dispatcher from "./dispatcher";
import React from "react";

class Navbar extends React.Component{
    gotoCustomer = () => {
        dispatcher.dispatch({
            actionType: "page-select",
            selectedPage: "customer"
        });
    };

    gotoWorker = () => {
        dispatcher.dispatch({
            actionType: "page-select",
            selectedPage: "worker"
        });
    };

    gotoManager = () => {
        dispatcher.dispatch({
            actionType: "page-select",
            selectedPage: "manager"
        });
    };

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-brand">ShutterStore</div>
                <div className="nav-link" onClick={this.gotoCustomer}>Customer</div>
                <div className="nav-link" onClick={this.gotoWorker}>Worker</div>
                <div className="nav-link" onClick={this.gotoManager}>Manager</div>
            </nav>
        );
    }
}

export default Navbar;
