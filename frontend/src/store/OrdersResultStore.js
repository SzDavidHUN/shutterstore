import {EventEmitter} from "events";

class OrdersResultStore extends EventEmitter {

    results = [];

    emitChange() {
        this.emit('result-update')
    }

    addChangeListener(callback) {
        this.on('result-update', callback);
    }

    removeChangeListener(callback) {
        this.removeListener('result-update', callback);
    }

    setResults(results) {
        this.results = results.result; //TODO: Ez fordítva lehet értelmesebb lenne (ha a hívóban van az customers.customers
        this.emitChange();
    }

}

export default new OrdersResultStore();
