const express = require('express');
const router = express.Router();
const LaserModel = require('../models/LaserModel')
const laserModel = new LaserModel();

router.get('/', async function (req, res, next) {

    try {
        let laser = await laserModel.getByLaserGuid(req.query.laserGuid);
        res.send(`${laser.PlayVoiceAnnouncements}`);
    } catch (error) {
        res.sendStatus(500);
    }
});

module.exports = router;