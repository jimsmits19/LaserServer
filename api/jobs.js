const express = require('express');
const router = express.Router();
const JobModel = require('../models/JobModel');
const jobModel = new JobModel();

router.post('/', async function (req, res, next) {

    const jobs = await jobModel.jobCount(req.body.filename, req.body.ApiToken)

    if (jobs.JobCount >= 1) {
        res.sendStatus(200);
    }
    else {
        try {
            await jobModel.create(req.body.jobname, req.body.apitoken, req.body.laserguid, req.body.filename)
            res.sendStatus(201);
        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }
    }
});

module.exports = router;