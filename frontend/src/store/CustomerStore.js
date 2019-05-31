import {EventEmitter} from "events";

class CustomerStore extends EventEmitter {

    customers = [];

    emitChange() {
        this.emit('users-update')
    }

    addChangeListener(callback) {
        this.on('users-update', callback);
    }

    removeChangeListener(callback) {
        this.removeListener('users-update', callback);
    }

    setCustomers(customers) {
        this.customers = customers.customers; //TODO: Ez fordítva lehet értelmesebb lenne (ha a hívóban van az customers.customers
        this.emitChange();
    }

}

export default new CustomerStore();
