const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

function InvoiceDao() {
}

InvoiceDao.prototype.getAllInvoices = callback => {
    const mongoclient = new MongoClient(url);
    mongoclient.connect((err, client) => {
        let db = client.db("shutterstore");
        db.collection('invoice').find().toArray((err, invoices) => {
            callback(invoices, err);
            client.close()
        });
    });
};

InvoiceDao.prototype.getInvoiceByID = (invoiceID, callback) => {
    const mongoclient = new MongoClient(url);
    mongoclient.connect((err, client) => {
        let db = client.db("shutterstore");
        db.collection('invoice').find({id: invoiceID}).toArray((err, invoices) => {
            callback(invoices, err);
            client.close()
        });
    });
};

InvoiceDao.prototype.payInvoiceByID = (invoiceID, callback) => {
    const mongoclient = new MongoClient(url);
    mongoclient.connect((err, client) => {
        let db = client.db("shutterstore");
        db.collection('invoice').updateOne({id: invoiceID}, {$set: {paid: true}}, {},(err) => {
            callback(err);
        });
    });
};

InvoiceDao.prototype.storeNewInvoice = (invoice, callback) => {
    const mongoclient = new MongoClient(url);
    mongoclient.connect((err, client) => {
        let db = client.db("shutterstore");
        db.collection('invoice').insertOne(invoice, (err, r) => {
            callback(r, err);
            client.close();
        });
    });
};

module.exports = InvoiceDao;
