import OrderConstants from '../constants/OrderConstants'
import ApplicationDispatcher from '../dispatcher/ApplicationDispatcher'

class OrderActions {

    fetchOrders() {
        ApplicationDispatcher.handleViewAction({
            actionType: OrderConstants.GET_ORDERS,
            payload: null
        });
    }

    createOrder(order) {
        ApplicationDispatcher.handleViewAction({
            actionType: OrderConstants.CREATE_ORDER,
            payload: order
        });
    }

    fetchOrderById(orderId) {
        ApplicationDispatcher.handleViewAction({
            actionType: OrderConstants.GET_ORDER_BY_ID,
            payload: orderId
        });
    }

    setOrderToAssembled(orderId, assembledParts) {
        ApplicationDispatcher.handleViewAction({
            actionType: OrderConstants.SET_ORDER_TO_ASSEMBLED,
            payload: {orderId: orderId, assembledParts: assembledParts}
        });
    }

    installShutter(orderId) {
        ApplicationDispatcher.handleViewAction({
            actionType: OrderConstants.INSTALL_ORDER,
            payload: orderId
        });
    }
}

export default new OrderActions();