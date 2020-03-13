const express = require('express');
const router = express.Router();
const CompanyModel = require('../models/CompanyModel')

router.get('/', async function (req, res, next) {

    try {
        var count = await new CompanyModel().apiTokenCount(req.query['token'])

        if (count === 1) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(400);
        } 
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
});

module.exports = router;