module.exports = {
    GET_ORDERS: 'orders',
    CREATE_ORDER: 'orders/add',
    GET_ORDER_BY_ID: 'orders/:orderId',
    SET_ORDER_TO_ASSEMBLED: 'orders/assemble',
    INSTALL_ORDER: 'orders/install/:orderId',
    ORDER_STATE: {
        CREATED: 'CREATED',
        ASSEMBLED: 'ASSEMBLED',
        INSTALLED: 'INSTALLED',
        COMPLETED: 'COMPLETED'
    }
};