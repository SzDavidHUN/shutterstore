import ApplicationDispatcher from "../dispatcher/ApplicationDispatcher";
import ActionConstants from '../constants/ActionConstants.js'

export default class OrderActions {
    getInProgressOrders() {
        ApplicationDispatcher.dispatch({
            actionType: ActionConstants.GET_ORDERS_WORKER
        });
    }

    getOrderByID(orderID) {
        ApplicationDispatcher.dispatch({
            actionType: ActionConstants.GET_ORDER_BY_ID,
            orderID: orderID
        })
    }
}
