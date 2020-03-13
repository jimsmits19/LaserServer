const express = require('express');
const router = express.Router();
const LaserModel = require('../models/LaserModel')
const laserModel = new LaserModel();

router.post('/', async function (req, res, next) {

    try {
        await laserModel.create(req.body.name, req.body.laserguid, req.body.token, 1);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
});

module.exports = router;