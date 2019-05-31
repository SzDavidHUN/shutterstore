import ApplicationDispatcher from "../dispatcher/ApplicationDispatcher";
import ActionConstants from '../constants/ActionConstants.js'

export default class InvoiceActions {

    createInvoice(invoice) {
        ApplicationDispatcher.dispatch({
            actionType: ActionConstants.CREATE_INVOICE,
            invoice: invoice
        });
    }

    getInvoiceByID(id){
        ApplicationDispatcher.dispatch({
            actionType: ActionConstants.GET_INVOICE_BY_ID,
            id: id
        });

    }
}
