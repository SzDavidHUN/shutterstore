const express = require('express');
const router = express.Router();
const partService = require('../service/PartService');

router.get('/', (req, res) => {
    req.url = '/list';
    router.handle(req, res);
});

router.get('/list', function (req, res) {
    partService.listParts((parts) => {
        res.status(200).send(parts);
    });
});

router.get('/materials', function (req, res) {
    partService.listMaterialsOfParts((materials) => {
        console.log('Materials of parts: ' + materials);
        res.status(200).send(materials);
    });
});

module.exports = router;