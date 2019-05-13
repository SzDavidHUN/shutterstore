const OrderDao = require('../dao/orderDao');
const Order = require('../enity/order');
const CustomerService = require('../service/customerService');

class OrderService {
    constructor() {
        this.orderDao = new OrderDao();
        this.customerService = new CustomerService()
    }

    getAllOrders(callback) {
        this.orderDao.getAllOrders(callback);
    }

    createOrder(customerID, callback){
        this.customerService.getCustomerById(customerID, (err, docs) => {
           if(docs.length > 0) {
               let order = new Order(customerID);
               this.orderDao.saveOrder(order, (err, doc) => {
                   if(err){
                       callback(null, {status: 500, msg: err});
                   } else {
                       callback(doc, null);
                   }
               });
           } else {
               callback(null, {status: 500, msg: 'CustomerID cou1dn\'t be found'});
           }
        });
    }

    getOrdersForCustomer(customerID, callback){
        this.orderDao.getOrdersForCustomer(customerID, (orders, err) => {
            callback(orders, err);
        })
    }

}

module.exports = OrderService
