const MongoClient = require('mongodb').MongoClient;

class OrderDao {
    constructor() {
        const url = 'mongodb://localhost:27017';
        this.mongoclient = new MongoClient(url);
    }

    getAllOrders(callback) {
        this.mongoclient.connect((err, client) => {
            let db = client.db("shutterstore");
            db.collection('order').find().toArray((err, docs) => {
                callback(docs, err);
            });
        });
    }

    saveOrder(order, callback) {
        this.mongoclient.connect((err, client) => {
            let db = client.db("shutterstore");
            db.collection('order').insertOne(order, {}, (err) => {
                callback(err);
            });
        });
    }

    getOrdersForCustomer(customerID, callback) {
        this.mongoclient.connect((err, client) => {
            let db = client.db("shutterstore");
            db.collection('order').find({customerID: customerID}).toArray((err, docs) => {
                callback(docs, err);
            });
        });
    }

    getOrdersInProgress(callback){
        const mongoclient = new MongoClient(this.url);
        mongoclient.connect((err, client) => {
            let db = client.db("shutterstore");
            db.collection('order').find({assembled: false}).toArray((err, docs) => {
                callback(docs, err);
            });
        });

    }

}

module.exports = OrderDao;
