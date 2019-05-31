import React from "react";
import ListOrders from "./ListOrders";
import {MANAGER_VIEW_ORDER_PREFIX, VIEW_ORDER_SUFFIX_MANAGER} from "../constants/RouterConstants";

class Manager extends React.Component {
    render() {
        return (
            <div>
                Manager
                <ListOrders prefix={MANAGER_VIEW_ORDER_PREFIX} suffix={VIEW_ORDER_SUFFIX_MANAGER}/>
            </div>
        )
    }

}

export default Manager
