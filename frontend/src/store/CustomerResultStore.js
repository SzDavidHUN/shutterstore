import {EventEmitter} from "events";

class CustomerResultStore extends EventEmitter {

    result = {};

    emitChange() {
        this.emit('result-update')
    }

    addChangeListener(callback) {
        this.on('result-update', callback);
    }

    removeChangeListener(callback) {
        this.removeListener('result-update', callback);
    }

    setResult(result) {
        this.result = result.result; //TODO: Ez fordítva lehet értelmesebb lenne (ha a hívóban van az customers.customers
        this.emitChange();
    }

}

export default new CustomerResultStore();
