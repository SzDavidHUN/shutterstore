const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;
const ApplicationConstants = require('./ApplicationConstants');

class OrderDAO {

    createOrder(order, callback) {
        const client = MongoClient(ApplicationConstants.dbURL);
        client.connect((err) => {
            if (err !== null) {
                console.log({error: err});
                callback([]);
            }

            const db = client.db(ApplicationConstants.dbName);
            const collection = db.collection(ApplicationConstants.collections.orders.collectionName);
            collection.insertOne(order, (err, r) => {
                console.log("order created:" + JSON.stringify(order));
                callback();
            });
        });
    }

    listOrders(callback) {
        const client = MongoClient(ApplicationConstants.dbURL);
        client.connect((err) => {
            if (err !== null) {
                console.log({error: err});
                callback([]);
            }

            const db = client.db(ApplicationConstants.dbName);
            const collection = db.collection(ApplicationConstants.collections.orders.collectionName);
            collection.find().toArray((err, orders) => {
                console.log("orders found:" + JSON.stringify(orders));
                callback(orders);
            });
        });
    }

    getOrderById(orderId, callback) {
        const client = MongoClient(ApplicationConstants.dbURL);
        client.connect((err) => {
            if (err !== null) {
                console.log({error: err});
                callback([]);
            }

            const db = client.db(ApplicationConstants.dbName);
            const collection = db.collection(ApplicationConstants.collections.orders.collectionName);
            console.log('querying order: ' + orderId);
            const orderIdObject = new ObjectId(orderId);
            collection.find({_id: orderIdObject}).toArray((err, order) => {
                console.log("found order with matching id:" + JSON.stringify(order[0]));
                callback(order[0]);
            });
        });
    }

    assembleOrder(orderId, parts, callback) {
        const client = MongoClient(ApplicationConstants.dbURL);
        client.connect((err) => {
            if (err !== null) {
                console.log({error: err});
                callback([]);
            }

            const db = client.db(ApplicationConstants.dbName);
            const collection = db.collection(ApplicationConstants.collections.orders.collectionName);
            console.log('querying order: ' + orderId);
            const orderIdObject = new ObjectId(orderId);
            collection.updateOne({_id: orderIdObject}, {
                $set: {
                    state: 'ASSEMBLED',
                    parts: parts
                }
            }).then((err) => {
                callback();
            });
        });
    }

    installOrder(orderId, callback) {
        const client = MongoClient(ApplicationConstants.dbURL);
        client.connect((err) => {
            if (err !== null) {
                console.log({error: err});
                callback([]);
            }

            const db = client.db(ApplicationConstants.dbName);
            const collection = db.collection(ApplicationConstants.collections.orders.collectionName);
            console.log('querying order: ' + orderId);
            const orderIdObject = new ObjectId(orderId);
            collection.updateOne({_id: orderIdObject}, {
                $set: {
                    state: 'INSTALLED'
                }
            }).then((err, order) => {
                callback(order);
            });
        });
    }

}

module.exports = new OrderDAO();