import ApplicationDispatcher from "../dispatcher/ApplicationDispatcher";
import ActionConstants from '../constants/ActionConstants.js'

export default class EditOrderActions {
    updateWindows(windows) {
        ApplicationDispatcher.dispatch({
            actionType: ActionConstants.UPDATE_WINDOWS,
            windows: windows
        });
    }

    updateWindow(windowIndex, window) {
        ApplicationDispatcher.dispatch({
            actionType: ActionConstants.UPDATE_WINDOW,
            windowIndex: windowIndex,
            window: window
        });

    }

    updateShutter(windowIndex, shutterIndex, shutter) {
        ApplicationDispatcher.dispatch({
            actionType: ActionConstants.UPDATE_SHUTTER,
            windowIndex: windowIndex,
            shutterIndex: shutterIndex,
            shutter: shutter
        });

    }

    addWindow() {
        ApplicationDispatcher.dispatch({
            actionType: ActionConstants.ADD_WINDOW
        });

    }

    addShutter(windowIndex) {
        ApplicationDispatcher.dispatch({
            actionType: ActionConstants.ADD_SHUTTER,
            windowIndex: windowIndex
        });

    }

    submitOrder() {
        ApplicationDispatcher.dispatch({
            actionType: ActionConstants.SUBMIT_ORDER,
        });
    }

    newOrder() {
        ApplicationDispatcher.dispatch({
            actionType: ActionConstants.NEW_ORDER,
        });
    }
}
