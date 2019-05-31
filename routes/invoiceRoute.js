const express = require('express');
const router = express.Router();

const InvoiceService = require('../service/invoiceService');
const invoiceService = new InvoiceService();

router.get('/all', (req, res) => {
    invoiceService.getAllCustomers((invoices, err) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(200).send(invoices);
    })
});

router.get('/id/:id', (req, res) => {
    if (!req.params.id) {
        res.status(400).send('ID is missing!');
        return;
    }
    invoiceService.getInvoiceByID(req.params.id, (invoices, err) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send(invoices);
    })
});

router.put('/new', (req, res) => {
    if (!req.body.customerID) {
        res.status(400).send('CustomerID is missing!');
        return;
    }
    if (!req.body.orderID) {
        res.status(400).send('OrderID is missing!');
        return;
    }
    if (!req.body.price) {
        res.status(400).send('Price is missing!');
        return;
    }
    invoiceService.newOrder(req.body.customerID, req.body.orderID, req.body.price, (r, err) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(200).send(r);
    });
});

module.exports = router;
