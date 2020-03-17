const express = require('express');
const router = express.Router();
const RemoteLogModel = require('../models/RemoteLogModel')
const remoteLogModel = new RemoteLogModel();

router.post('/', async function (req, res, next) {

    try {

        await remoteLogModel.create(req.body.message);
        res.sendStatus(201);
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
});

module.exports = router;