const express = require('express');
const router = express.Router();
const LaserStatusModel2 = require('../models/LaserStatusModel2')
const laserStatusModel2 = new LaserStatusModel2();

router.post('/', async function (req, res, next) {

    try {

        let response = await laserStatusModel2.count(req.body.laserId);
        console.log(response[0].count);
        if (response[0].count == 0) {
            await laserStatusModel2.create(req.body.laserId, req.body.status);
            res.sendStatus(201);
        }
        else {
            let laserStatus = { laserId : req.body.laserId, status : req.body.status};
            console.log(laserStatus);
            await laserStatusModel2.update(laserStatus);
            res.sendStatus(201);
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
});

module.exports = router;