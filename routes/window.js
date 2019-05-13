const express = require('express');
const router = express.Router();
const WindowService = require('../service/windowService');

const windowService = new WindowService();

router.get('/:orderID', (req, res) => {
    windowService.getAllWindows((windows, error) => {
       if(error) {
           res.status(500).send(error);
           return;
       }
       res.status(200).send(windows);
    });
});

module.exports = router;
