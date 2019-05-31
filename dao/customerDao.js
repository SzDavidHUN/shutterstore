const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

function CustomerDao() {

}

CustomerDao.prototype.storeNewCustomer = (customer) => {
    const mongoclient = new MongoClient(url);
    mongoclient.connect((err, client) => {
        let db = client.db("shutterstore");
        db.collection('customer').insertOne(customer, (err, r) => {
            client.close();
        });
    })
};

CustomerDao.prototype.getAllCustomers = (callback) => {
    const mongoclient = new MongoClient(url);
    mongoclient.connect((err, client) => {
        let db = client.db("shutterstore");
        db.collection('customer').find().toArray((err, docs) => {
            callback(docs);
            client.close()
        });
    })
};

CustomerDao.prototype.getCustomerById = (id, callback) => {
    const mongoclient = new MongoClient(url);
    mongoclient.connect((err, client) => {
        let db = client.db("shutterstore");
        let filter = {};
        filter.id = id;
        db.collection('customer').find(filter).toArray((err, docs) => {
            callback(err, docs);
            client.close()
        });
    })
};

CustomerDao.prototype.getCustomerByName = (name, callback) => {
    const mongoclient = new MongoClient(url);
    mongoclient.connect((err, client) => {
        let db = client.db("shutterstore");
        let filter = {};
        filter.name = name;
        db.collection('customer').find(filter).toArray((err, docs) => {
            callback(err, docs);
            client.close()
        });
    })
};


module.exports = CustomerDao;
