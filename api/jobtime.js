const express = require('express');
const router = express.Router();
const JobTimeModel = require('../models/JobTimeModel')
const jobTimeModel = new JobTimeModel();

router.post('/', async function (req, res, next) {

    try {

        await jobTimeModel.create(req.body.jobName, req.body.laserId, req.body.jobBeginEnd, req.body.timestamp);
        res.sendStatus(201);

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
});

module.exports = router;