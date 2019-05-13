const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const Server = require('mongodb').Server;

const url = 'mongodb://localhost:27017';
/* GET home page. */
router.get('/', function (req, res, next) {
    res.status(200).send('OK');
});

router.put('/:collection', (req, res) => { //save
    if (!req.body['name']) {
        //hiba
    }

    let customer = new Customer(req.body['name']);

    var mongoclient = new MongoClient(url);
    mongoclient.connect((err, mongoclient) => {
        let db = mongoclient.db("test");
        db.collection(req.params['collection']).insertOne(customer);
        mongoclient.close();
        res.status(204).send();
    });
});

router.put('/:collection', (req, res) => { //save
    var mongoclient = new MongoClient(url);
    mongoclient.connect((err, mongoclient) => {
        let db = mongoclient.db("test");
        db.collection(req.params['collection']).insertOne(req.body);
        mongoclient.close();
        res.status(204).send();
    });
});


router.get('/:db/:collection', (req, res) => {  //get all
    var mongoclient = new MongoClient(url);
    mongoclient.connect((err, mongoclient) => {
        let db = mongoclient.db(req.params['db']);
        db.collection(req.params['collection']).find().toArray((err, docs) => {
            res.status(200).send(JSON.stringify(docs));
        });
        mongoclient.close();
    });
});

router.post('/:collection', (req, res) => { //search
    var mongoclient = new MongoClient(url);
    mongoclient.connect((err, mongoclient) => {
        let db = mongoclient.db("test");
        db.collection(req.params['collection']).find(req.body).toArray((err, docs) => {
            res.status(200).send(JSON.stringify(docs));
        });
        mongoclient.close();
    });
});

router.delete('/:collection', (req, res) => {
    var mongoclient = new MongoClient(url);
    mongoclient.connect((err, mongoclient) => {
        let db = mongoclient.db("test");
        db.collection(req.params['collection']).deleteOne(req.body).toArray((err, docs) => {
            let ret_ = {};
            ret.count = docs.res.status(200).send(JSON.stringify());
        });
        mongoclient.close();
    });
});

module.exports = router;
