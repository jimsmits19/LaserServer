const express = require('express');
const router = express.Router();
const IdleTimeModel = require('../models/IdleTimeModel')
const idleTimeModel = new IdleTimeModel();

router.post('/', async function (req, res, next) {

    try {

        await idleTimeModel.create(req.body.laserId, req.body.idleTime);
        res.sendStatus(201);
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
});

module.exports = router;