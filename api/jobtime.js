const express = require('express');
const router = express.Router();
const JobTimeModel = require('../models/JobTimeModel')
const jobTimeModel = new JobTimeModel();

router.post('/', async function (req, res, next) {

    try {

        let response = await jobTimeModel.count(req.body.laserId, req.body.jobName);

        if (response[0].count == 0) {

            await jobTimeModel.create(req.body.jobName, req.body.laserId, req.body.isRunning);
            res.sendStatus(201);
        }
        else {
            let jobTime = { 
                laserId : req.body.laserId, 
                jobName : req.body.jobName, 
                isRunning : req.body.isRunning,
                runTime: req.body.runTime
              };
            
            let jobId = await jobTimeModel.getMaxId(jobTime.jobName, jobTime.laserId);

            jobTime.jobId = jobId[0].maxID;

            console.log(jobTime);

            await jobTimeModel.update(jobTime);
            res.sendStatus(201);
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
});

module.exports = router;