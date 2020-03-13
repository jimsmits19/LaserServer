const express = require('express');
const router = express.Router();
const LaserStatusModel2 = require('../models/LaserStatusModel2')

router.get('/', async function(req, res, next) {


    const laserStatus = await new LaserStatusModel2().getAll()

    for (let index = 0; index < laserStatus.length; index++) {
        laserStatus[index].Status = '<div class="status" id="status' + laserStatus[index].LaserID + '">' + laserStatus[index].Status + '</div>';
    }


    res.send(laserStatus);

});

module.exports = router;
