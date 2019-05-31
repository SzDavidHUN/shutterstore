const MongoClient = require('mongodb').MongoClient;

class OrderDao {
    constructor() {
        this.url = 'mongodb://localhost:27017';
    }

    getAllOrders(callback) {
        const mongoclient = new MongoClient(this.url);
        mongoclient.connect((err, client) => {
            let db = client.db("shutterstore");
            db.collection('order').find().toArray((err, docs) => {
                callback(docs, err);
            });
        });
    }

    saveOrder(order, callback) {
        const mongoclient = new MongoClient(this.url);
        mongoclient.connect((err, client) => {
            let db = client.db("shutterstore");
            db.collection('order').insertOne(order, {}, (err) => {
                callback(err);
            });
        });
    }

    getOrdersForCustomer(customerID, callback) {
        const mongoclient = new MongoClient(this.url);
        mongoclient.connect((err, client) => {
            let db = client.db("shutterstore");
            db.collection('order').find({customerID: customerID}).toArray((err, docs) => {
                callback(docs, err);
            });
        });
    }

    getOrdersInProgress(callback) {
        const mongoclient = new MongoClient(this.url);
        mongoclient.connect((err, client) => {
            let db = client.db("shutterstore");
            db.collection('order').find({assembled: false}).toArray((err, docs) => {
                callback(docs, err);
            });
        });
    }

    getOrdersByID(orderid, callback) {
        const mongoclient = new MongoClient(this.url);
        mongoclient.connect((err, client) => {
            let db = client.db("shutterstore");
            db.collection('order').find({id: orderid}).toArray((err, docs) => {
                callback(docs, err);
            });
        });
    }

    updateOrder(order, callback) {
        const mongoclient = new MongoClient(this.url);
        mongoclient.connect((err, client) => {
            let db = client.db("shutterstore");
            db.collection('order').updateOne({id: order.id}, {$set: {invoice: order.invoice}}, {},(err) => {
                callback(err);
            });
        });
    }

    setInvoice(orderid, invoiceid, callback) {
        this.getOrdersByID(orderid, (docs, err) => {
            const order = docs[0];
            order.invoice = invoiceid;
            this.updateOrder(order, callback);
        })
    }

    markAsAssembled(orderid, callback)  {
        const mongoclient = new MongoClient(this.url);
        mongoclient.connect((err, client) => {
            let db = client.db("shutterstore");
            db.collection('order').updateOne({id: orderid}, {$set: {assembled: true}}, {},(err) => {
                callback(err);
            });
        });
    };
}

module.exports = OrderDao;
