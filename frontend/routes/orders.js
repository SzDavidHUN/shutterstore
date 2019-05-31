const express = require('express');
const router = express.Router();
const orderService = require('../service/OrderService');

router.get('/', (req, res) => {
    req.url = '/list';
    router.handle(req, res);
});

router.post('/add', (req, res) => {
    const order = req['body'];
    const window = order['window'];
    const shutter = order['shutter'];
    const customer = order['customer'];
    if (!order) {
        res.status(400).send("Order is empty");
    }
    if (!window) {
        res.status(400).send("The order must contain the window parameters");
    }
    if (!shutter) {
        res.status(400).send("The order must contain the shutter parameters");
    }

    if (!customer) {
        res.status(400).send("The order must contain the customer details");
    }

    orderService.createOrder(order, (data) => {
        res.status(200).send(data);
    });
});

router.get('/list', (req, res) => {
    orderService.listOrders((orders) => {
        res.status(200).send(orders);
    });
});

router.get('/:orderId', (req, res) => {
    orderService.getOrderById(req.params.orderId, (order) => {
        res.status(200).send(order);
    });
});

router.post('/assemble/:orderId', (req, res) => {
    const parts = req['body'];
    if (!parts) {
        res.status(400).send("Parts are empty");
    }
    orderService.assembleOrder(req.params.orderId, parts, () => {
        res.status(200).send("Order assembled successfully");
    });
});

router.get('/install/:orderId', (req, res) => {
    orderService.installOrder(req.params.orderId, (order) => {
        res.status(200).send(order);
    });
});

module.exports = router;