const express = require('express');
const router = express.Router();
const JobTimeModel = require('../models/JobTimeModel')

router.get('/', async function(req, res, next) {


    const result = await new JobTimeModel().getAll()

    console.log(result)

    res.send(result);

});

module.exports = router;
