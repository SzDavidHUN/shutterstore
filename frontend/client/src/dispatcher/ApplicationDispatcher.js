import {Dispatcher} from 'flux'
import React from 'react'
import ReactDOM from 'react-dom'

import OrderConstants from '../constants/OrderConstants'
import PartConstants from '../constants/PartConstants'
import OrderStore from "../store/OrderStore";
import PartStore from "../store/PartStore";
import OrderList from "../components/order/OrderList";

class ApplicationDispatcher extends Dispatcher {

    serverURL = 'http://localhost:3000';

    handleViewAction(action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            payload: action
        });
    }
}

const dispatcher = new ApplicationDispatcher();

dispatcher.register((data) => {
    if (data.payload.actionType !== OrderConstants.GET_ORDERS) {
        return;
    }
    fetch(dispatcher.serverURL + '/orders').then((response) => {
        return response.json();
    }).then((result) => {
        OrderStore._queriedOrders = result;
        OrderStore.emitChange();
    });
});

dispatcher.register((data) => {
    if (data.payload.actionType !== OrderConstants.CREATE_ORDER) {
        return;
    }
    console.log(data.payload.payload);
    console.log(JSON.stringify(data.payload.payload));

    fetch(dispatcher.serverURL + '/orders/add', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data.payload.payload)
    }).then((result) => {
        OrderStore.emitChange();
        ReactDOM.render(
            React.createElement(OrderList),
            document.getElementById('mainContentPanel')
        );
    });
});

dispatcher.register((data) => {
    if (data.payload.actionType !== PartConstants.GET_MATERIALS) {
        return;
    }
    fetch(dispatcher.serverURL + '/parts/materials').then((response) => {
        return response.json();
    }).then((result) => {
        PartStore._materials = result;
        PartStore.emitChange();
    });
});

dispatcher.register((data) => {
    if (data.payload.actionType !== PartConstants.GET_PARTS) {
        return;
    }
    fetch(dispatcher.serverURL + '/parts').then((response) => {
        return response.json();
    }).then((result) => {
        PartStore._parts = result;
        PartStore.emitChange();
    });
});

dispatcher.register((data) => {
    if (data.payload.actionType !== OrderConstants.GET_ORDER_BY_ID) {
        return;
    }
    fetch(dispatcher.serverURL + '/orders/' + data.payload.payload).then((response) => {
        return response.json();
    }).then((result) => {
        OrderStore._referenceOrder = result;
        OrderStore.emitChange();
    });
});

dispatcher.register((data) => {
    if (data.payload.actionType !== OrderConstants.SET_ORDER_TO_ASSEMBLED) {
        return;
    }
    console.log(data.payload.payload);
    console.log(JSON.stringify(data.payload.payload));

    fetch(dispatcher.serverURL + '/orders/assemble/' + data.payload.payload.orderId, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data.payload.payload.assembledParts)
    }).then((result) => {
        OrderStore.emitChange();
    });
});

dispatcher.register((data) => {
    if (data.payload.actionType !== OrderConstants.INSTALL_ORDER) {
        return;
    }
    fetch(dispatcher.serverURL + '/orders/install/' + data.payload.payload).then((result) => {
        OrderStore.emitChange();
    });
});

export default dispatcher;