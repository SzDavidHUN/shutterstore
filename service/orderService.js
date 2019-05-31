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
               if(docs.length > 1)
                   console.error("More than one customer found for ID: " + customerID); //TODO return with error status
               let order = new Order(customerID, docs[0].name);
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

    submitOrder(sumbitOrder, callback){
        if(!sumbitOrder.customerID){
            callback(null, {status: 400, msg: 'CustomerID is neccesary!'});
            return;
        }
        if(!sumbitOrder.windows){
            callback(null, {status: 400, msg: 'Windows are neccesary!'});
            return;
        }
        this.customerService.getCustomerById(sumbitOrder.customerID, (err, docs) => {
            if(docs.length > 0) {
                if(docs.length > 1)
                    console.error("More than one customer found for ID: " + customerID); //TODO return with error status
                let order = new Order(sumbitOrder.customerID, docs[0].name, sumbitOrder.windows);
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

    getOrdersInProgress(callback){
        this.orderDao.getOrdersInProgress((orders, err) => {
            callback(orders, err);
        })

    }

    getOrderByID(orderid, callback){
        this.orderDao.getOrdersByID(orderid, callback);
    }

    setInvoice(orderid, invoiceid, callback){
        this.orderDao.setInvoice(orderid, invoiceid, callback);
    }
}

module.exports = OrderService
