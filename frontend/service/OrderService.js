const orderDAO = require('../dao/OrderDAO');

class OrderService {

    createOrder(order, callback) {
        orderDAO.createOrder(order, (data) => {
            callback(data);
        });
    }

    listOrders(callback) {
        orderDAO.listOrders((orders) => {
            callback(orders);
        });
    }

    getOrderById(orderId, callback) {
        orderDAO.getOrderById(orderId, (order) => {
            callback(order);
        });
    }

    assembleOrder(orderId, parts, callback) {
        orderDAO.assembleOrder(orderId, parts, () => {
            callback();
        });
    }

    installOrder(orderId, callback) {
        orderDAO.installOrder(orderId, (order) => {
            callback(order);
        });
    }

}

module.exports = new OrderService();