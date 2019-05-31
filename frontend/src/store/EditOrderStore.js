import {EventEmitter} from "events";

class EditOrderStore extends EventEmitter {

    windows = [];

    emitChange() {
        this.emit('edit-order-windows-update')
    }

    addChangeListener(callback) {
        this.on('edit-order-windows-update', callback);
    }

    removeChangeListener(callback) {
        this.removeListener('edit-order-windows-update', callback);
    }

    setWindows(windows) {
        this.windows = windows;
        this.emitChange();
    }

}

export default new EditOrderStore();
