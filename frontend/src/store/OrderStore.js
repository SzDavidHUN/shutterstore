import {EventEmitter} from "events";

class OrderStore extends EventEmitter {

    orders = [];

    emitChange() {
        this.emit('orders-update')
    }

    addChangeListener(callback) {
        this.on('orders-update', callback);
    }

    removeChangeListener(callback) {
        this.removeListener('orders-update', callback);
    }

    setOrders(orders) {
        this.orders = orders.orders; //TODO: Ez fordítva lehet értelmesebb lenne (ha a hívóban van az orders.orders
        this.emitChange();
    }

}

export default new OrderStore();
