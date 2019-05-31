import React from 'react';
import Register from "./RegisterCustomer";
import Login from "./ListCustomer";

function CustomerLogin() {
    return (
        <div className="row">
            <div className="col-6">
                <Login/>
            </div>
            <div className="col-6">
                <Register/>
            </div>
        </div>
    )
}

export default CustomerLogin;
