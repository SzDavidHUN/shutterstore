import ApplicationDispatcher from "../dispatcher/ApplicationDispatcher";
import ActionConstants from '../constants/ActionConstants.js'

export default class InvoiceActions {

    createInvoice(invoice) {
        ApplicationDispatcher.dispatch({
            actionType: ActionConstants.CREATE_INVOICE,
            invoice: invoice
        });
    }

    payInvoice(id) {
        ApplicationDispatcher.dispatch({
            actionType: ActionConstants.PAY_INVOICE,
            id: id
        });
    }

    getInvoiceByID(id){
        ApplicationDispatcher.dispatch({
            actionType: ActionConstants.GET_INVOICE_BY_ID,
            id: id
        });

    }
}
