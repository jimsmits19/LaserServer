const express = require('express');
const router = express.Router();
const LaserStatusModel2 = require('../models/LaserStatusModel2')
const laserStatusModel2 = new LaserStatusModel2();


router.get('/', async function (req, res, next) {

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep alive'
    })

    let status = await laserStatusModel2.get(req.query["laserId"]);

    res.write("retry: 1000\n");
    res.write(`data: ${status}\n\n`);

    res.end();
    //next();

});

module.exports = router;
