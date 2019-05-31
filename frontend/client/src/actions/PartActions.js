import PartConstants from '../constants/PartConstants'
import ApplicationDispatcher from '../dispatcher/ApplicationDispatcher'

class PartActions {

    fetchMaterials() {
        ApplicationDispatcher.handleViewAction({
            actionType: PartConstants.GET_MATERIALS,
            payload: null
        });
    }

    fetchParts() {
        ApplicationDispatcher.handleViewAction({
            actionType: PartConstants.GET_PARTS,
            payload: null
        });
    }
}

export default new PartActions();