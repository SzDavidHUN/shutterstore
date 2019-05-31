const MongoClient = require('mongodb').MongoClient;
const ApplicationConstants = require('./ApplicationConstants');

class PartDAO {

    listParts(callback) {
        const client = MongoClient(ApplicationConstants.dbURL);
        client.connect((err) => {
            if (err !== null) {
                console.log({error: err});
                callback([]);
            }

            const db = client.db(ApplicationConstants.dbName);
            const collection = db.collection(ApplicationConstants.collections.parts.collectionName);
            collection.find().toArray((err, orders) => {
                callback(orders);
            });
        });
    }

    listMaterialsOfParts(callback) {
        const client = MongoClient(ApplicationConstants.dbURL);
        client.connect((err) => {
            if (err !== null) {
                console.log({error: err});
                callback([]);
            }

            const db = client.db(ApplicationConstants.dbName);
            const collection = db.collection(ApplicationConstants.collections.parts.collectionName);
            const projection = {
                _id: 0,
                material: 1
            };
            collection.find({}).project(projection).toArray((err, materials) => {
                callback(materials);
            });
        })
    }

}

module.exports = new PartDAO();