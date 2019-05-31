import {Dispatcher} from "flux";
import ActionConstants from '../constants/ActionConstants.js'
import {Axios} from "axios";
import customerStore from "../store/CustomerStore.js"
import orderStore from "../store/OrderStore.js"
import customerResultStore from "../store/CustomerResultStore.js";
import ordersResultStore from "../store/OrdersResultStore.js";
import editOrderStore from "../store/EditOrderStore";
import InvoiceStore from "../store/InvoiceStore";

const dispatcher = new Dispatcher();
const axios = new Axios();

export default dispatcher;

dispatcher.register((payload) => {
    if (payload.actionType !== ActionConstants.GET_USERS)
        return;
    axios.get('http://localhost:3000/customer/all').then(data => {
        customerStore.setCustomers({customers: data.data})
    })
});

dispatcher.register((payload) => {
    if (payload.actionType !== ActionConstants.GET_ORDERS_WORKER)
        return;
    axios.get('http://localhost:3000/order/inprogress').then(data => {
        orderStore.setOrders({orders: data.data})
    })
});

dispatcher.register((payload) => {
    if (payload.actionType !== ActionConstants.GET_USERS_BY_ID)
        return;
    axios.get('http://localhost:3000/customer/id/' + payload.customerID).then(data => {
        customerResultStore.setResult({result: data.data[0]})
    })
});

dispatcher.register((payload) => {
    if (payload.actionType !== ActionConstants.GET_ORDERS_FOR_CUSTOMER)
        return;
    axios.get('http://localhost:3000/order/customerid/' + payload.customerID).then(data => {
        ordersResultStore.setResults({result: data.data})
    })
});

dispatcher.register((payload) => {
    if (payload.actionType !== ActionConstants.ADD_WINDOW)
        return;
    let windows = editOrderStore.windows;
    windows.push({height: 0, width: 0, shutter: []});
    editOrderStore.setWindows(windows);
});

dispatcher.register((payload) => {
    if (payload.actionType !== ActionConstants.ADD_SHUTTER)
        return;
    let windows = editOrderStore.windows;
    windows[payload.windowIndex].shutter.push({height: 0, width: 0, color: 'white', material: 'Plain Plastic'});
    editOrderStore.setWindows(windows);
});


dispatcher.register((payload) => {
    if (payload.actionType !== ActionConstants.UPDATE_WINDOWS)
        return;
    editOrderStore.setWindows(payload.windows);
});

dispatcher.register((payload) => {
    if (payload.actionType !== ActionConstants.UPDATE_WINDOW)
        return;
    let windows = editOrderStore.windows;
    windows[payload.windowIndex] = payload.window;
    editOrderStore.setWindows(windows);
});

dispatcher.register((payload) => {
    if (payload.actionType !== ActionConstants.UPDATE_SHUTTER)
        return;
    let windows = editOrderStore.windows;
    windows[payload.windowIndex].shutter[payload.shutterIndex] = payload.shutter;
    editOrderStore.setWindows(windows);
});

dispatcher.register((payload) => {
    if (payload.actionType !== ActionConstants.SUBMIT_ORDER)
        return;
    const windows = editOrderStore.windows;
    const order = {
        customerID: customerResultStore.result.id,
        windows: windows
    };
    axios.put('http://localhost:3000/order/submit', order).then(data => {
        alert('Order submitted!');
        console.log(editOrderStore.windows);
    }).catch(err => alert(err))
});

dispatcher.register((payload) => {
    if (payload.actionType !== ActionConstants.NEW_ORDER)
        return;
    editOrderStore.setWindows([]);
});

dispatcher.register((payload) => {
    if (payload.actionType !== ActionConstants.GET_ORDER_BY_ID)
        return;
    axios.get('http://localhost:3000/order/id/' + payload.orderID).then(data => {
        ordersResultStore.setResults({result: data.data})
    })
});

dispatcher.register((payload) => {
    if (payload.actionType !== ActionConstants.REGISTER_CUSTOMER)
        return;
    if (payload.customer.name === "") {
        alert('Name is empty!');
        return;
    }
    axios.put('http://localhost:3000/customer/new', payload.customer).then(data => {
        dispatcher.dispatch({
            actionType: ActionConstants.GET_USERS
        });
        alert('Customer (' + payload.customer.name + ') registered!');
    });
});

dispatcher.register((payload) => {
    if (payload.actionType !== ActionConstants.CREATE_INVOICE)
        return;
    axios.put('http://localhost:3000/invoice/new', payload.invoice).then(data => {
        alert('Invoice created!')
    }).catch((e) => {
        alert(e);
        alert(e.response.data);
        console.log(e);
        console.log(e.response);
        console.log(payload.invoice)
    });
});

dispatcher.register((payload) => {
    if (payload.actionType !== ActionConstants.GET_INVOICE_BY_ID)
        return;
    axios.get('http://localhost:3000/invoice/id/' + payload.id).then(data => {
        InvoiceStore.setResult({result: data.data[0]})
    })
});
