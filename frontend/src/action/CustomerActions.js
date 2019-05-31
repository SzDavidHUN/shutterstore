import ApplicationDispatcher from "../dispatcher/ApplicationDispatcher";
import ActionConstants from '../constants/ActionConstants.js'

export default class CustomerActions {
    getCustomers() {
        ApplicationDispatcher.dispatch({
            actionType: ActionConstants.GET_USERS
        });
    }

    getCustomerByID(customerID) {
        ApplicationDispatcher.dispatch({
            actionType: ActionConstants.GET_USERS_BY_ID,
            customerID: customerID
        });
    }

    getOrdersForCustomer(customerID) {
        ApplicationDispatcher.dispatch({
            actionType: ActionConstants.GET_ORDERS_FOR_CUSTOMER,
            customerID: customerID
        });
    }

    registerCustomer(customer) {
        ApplicationDispatcher.dispatch({
            actionType: ActionConstants.REGISTER_CUSTOMER,
            customer: customer
        });

    }
}
