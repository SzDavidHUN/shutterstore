const express = require('express');
const router = express.Router();

const CustomerService = require('../service/customerService');
const customerService = new CustomerService();


router.put('/new', (req, res) => {
    if (!req.body.name) {
        res.status(400).send('Customer name is missing!');
        return;
    }
    customerService.newCustomer(req.body.name);
    res.status(204).end();
});

router.get('/all', (req, res) => {
    customerService.getAllCustormers((docs) => {
        res.send(docs);
    });
});

router.get('/id/:id', (req, res) => {
    if (!req.params.id) {
        res.status(400).send('ID is missing!');
        return;
    }
    customerService.getCustomerById(req.params.id, (err, docs) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(200).send(docs);
    });
});

router.get('/name/:name', (req, res) => {
    if (!req.params.name) {
        res.status(400).send('Name is missing!');
        return;
    }
    customerService.getCustomerByName(req.params.name, (err, docs) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(200).send(docs);
    });
});

module.exports = router;
