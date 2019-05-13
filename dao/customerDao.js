const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const mongoclient = new MongoClient(url);

function CustomerDao() {

}

CustomerDao.prototype.storeNewCustomer = (customer) => {
    mongoclient.connect((err, client) => {
        let db = client.db("shutterstore");
        db.collection('customer').insertOne(customer);
    })
};

CustomerDao.prototype.getAllCustomers = (callback) => {
    mongoclient.connect((err, client) => {
        let db = client.db("shutterstore");
        db.collection('customer').find().toArray((err, docs) => {
            console.log('Err: ' + err);
            callback(docs);
        });
    })
};

CustomerDao.prototype.getCustomerById = (id, callback) => {
    mongoclient.connect((err, client) => {
        let db = client.db("shutterstore");
        let filter = {};
        filter.id = id;
        db.collection('customer').find(filter).toArray((err, docs) => {
            callback(err, docs);
        });
    })
};

CustomerDao.prototype.getCustomerByName = (name, callback) => {
    mongoclient.connect((err, client) => {
        let db = client.db("shutterstore");
        let filter = {};
        filter.name = name;
        db.collection('customer').find(filter).toArray((err, docs) => {
            callback(err, docs);
        });
    })
};


module.exports = CustomerDao;
