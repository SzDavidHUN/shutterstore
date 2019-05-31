import React from 'react';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import './App.css';
import OrderEditor from "./components/order/OrderEditor";
import OrderList from "./components/order/OrderList";
import DropdownButton from "react-bootstrap/DropdownButton";
import JobAssembler from "./components/job/JobAssembler";
import InvoiceViewer from "./components/invoice/InvoiceViewer";


function App() {
    return (
        <Router>
            <div className="app-container card">
                <div className="app-header card-header row">
                    <DropdownButton id="dropdown-basic-button" title="Orders">
                        <Link className="dropdown-item" to="/orderslist">Order List</Link>
                        <Link className="dropdown-item" to="/ordereditor">Order Editor</Link>
                    </DropdownButton>
                </div>
                <div className="card-body">
                    <div id="mainContentPanel">
                        <Route path="/orderslist/" component={OrderList}/>
                        <Route path="/ordereditor/" component={OrderEditor}/>
                        <Route path="/jobs/:orderId" component={JobAssembler}/>
                        <Route path="/invoice/:orderId" component={InvoiceViewer}/>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
