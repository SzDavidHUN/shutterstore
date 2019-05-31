import React from 'react';
import './App.scss'
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import Navbar from "./component/Navbar";
import Card from "./component/Card";
import CustomerLogin from "./component/CustomerLogin";
import Worker from "./component/Worker";
import ShowCustomer from "./component/ShowCustomer";
import EditOrder from "./component/EditOrder";
import {
    CREATE_INVOICE_ROUTE,
    CUSTOMER_LOGIN_LINK,
    MANAGER_LIST_ORDERS,
    NEW_ORDER_ROUTER,
    SHOW_CUSTOMER_BY_ID_ROUTE, VIEW_INVOICE_ROUTE,
    VIEW_ORDER_ROUTER,
    WORKER_LIST_ORDERS
} from "./constants/RouterConstants";
import ViewOrder from "./component/ViewOrder";
import Manager from "./component/Manager";
import CreateInvoice from "./component/CreateInvoice";
import ViewInvoice from "./component/ViewInvoice";

function App() {
    return (
        <div>
            <Router>
                <Navbar/>
                <div className="container">
                    <br/>
                    <Card title="Shutterstore">
                        <div>
                            <Route exact path="/" render={() => {
                                return (<Redirect to={CUSTOMER_LOGIN_LINK}/>)
                            }}/>
                            <Route path={CUSTOMER_LOGIN_LINK} component={CustomerLogin}/>
                            <Route path={SHOW_CUSTOMER_BY_ID_ROUTE} component={ShowCustomer}/>
                            <Route path={WORKER_LIST_ORDERS} component={Worker}/>
                            <Route path={MANAGER_LIST_ORDERS} component={Manager}/>
                            <Route path={NEW_ORDER_ROUTER} component={EditOrder}/>
                            <Route path={VIEW_ORDER_ROUTER} component={ViewOrder}/>
                            <Route path={CREATE_INVOICE_ROUTE} component={CreateInvoice}/>
                            <Route path={VIEW_INVOICE_ROUTE} component={ViewInvoice}/>
                        </div>
                    </Card>
                </div>
            </Router>
        </div>
    );
}

export default App;
