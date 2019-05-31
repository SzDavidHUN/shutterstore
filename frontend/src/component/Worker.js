import React from 'react';
import ListOrders from "./ListOrders";
import {VIEW_ORDER_SUFFIX_WORKER, WORKER_VIEW_ORDER_PREFIX} from "../constants/RouterConstants";

function Worker() {
    return (
        <div>
            <h1>Worker</h1>
            <h6>Jobs waiting to be done..</h6>
            <br/>
            <ListOrders prefix={WORKER_VIEW_ORDER_PREFIX} suffix={VIEW_ORDER_SUFFIX_WORKER} />
        </div>
    )
}

export default Worker
