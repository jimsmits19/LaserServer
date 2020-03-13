const express = require('express');
const router = express.Router();
const LaserStatusModel = require('../models/LaserStatusModel')

router.get('/', async function(req, res, next) {
  
    if (!req.query['laserid']){
        return res.redirect('/');
    }

    const laserStatus = await new LaserStatusModel().getByLaserId(req.query['laserid'])

    res.send(laserStatus);

});

module.exports = router;
