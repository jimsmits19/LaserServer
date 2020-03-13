const express = require('express');
const router = express.Router();
const JobModel = require('../models/JobModel')
const jobModel = new JobModel();

router.get('/', async function (req, res, next) {

    try {
        const jobs = await jobModel.getJobsByCompanyId(req.session.user.CompanyID)
        res.send(jobs);
    } catch (error) {
        console.log(error)
    }

});

module.exports = router;
