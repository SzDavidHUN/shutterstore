import {EventEmitter} from 'events'

class PartStore extends EventEmitter {

    _materials = [];
    _parts = [];

    emitChange() {
        this.emit('change')
    }

    addChangeListener(callback) {
        this.on('change', callback);
    }

    removeChangeListener(callback) {
        this.removeListener('change', callback);
    }

}

export default new PartStore();