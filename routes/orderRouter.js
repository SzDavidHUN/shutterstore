const express = require('express');
const router = express.Router();

const OrderService = require('../service/orderService');

let orderService = new OrderService;

router.get('/all', (req, res) => {
    orderService.getAllOrders((orders, err) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send(orders);
    });
});

router.get('/inprogress', (req, res) => {
    orderService.getOrdersInProgress((orders, err) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send(orders);
    });
});

router.get('/customerid/:id', (req, res) => {
    if (!req.params.id) {
        res.status(400).send('Missing customerID');
        return;
    }
    orderService.getOrdersForCustomer(req.params.id, (orders, err) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send(orders);
    });
});

router.put('/create/:customerID', (req, res) => {
    if (!req.params.customerID) {
        res.status(400).send('Missing customerID');
        return;
    }
    orderService.createOrder(req.params.customerID, (order, err) => {
        if (err) {
            res.status(err.status).send(err.msg);
            return;
        }
        res.status(200).send(order);
    });
});

router.put('/submit', (req, res) => {
    if (!req.body) {
        res.status(400).send('Missing customerID');
        return;
    }
    orderService.submitOrder(req.body, (order, err) => {
        if (err) {
            res.status(err.status).send(err.msg);
            return;
        }
        res.status(200).send(order);
    });
    res.status(200).send('OK');
});

router.get('/id/:id', (req, res) => {
    if (!req.params.id) {
        res.status(400).send('Missing customerID');
        return;
    }

    orderService.getOrderByID(req.params.id, (orders, err) => {
        if (err) {
            res.status(err.status).send(err.msg);
            return;
        }
        res.status(200).send(orders);
        return;
    });

    //res.status(200).send();
});

router.get('/assebled/:id', (req, res) => {
    if (!req.params.id) {
        res.status(400).send('ID is missing!');
        return;
    }
    orderService.markAsAssembled(req.params.id, (docs, err) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send(docs);
    })
});

module.exports = router;
