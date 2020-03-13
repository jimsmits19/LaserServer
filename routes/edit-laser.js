const express = require('express');
const router = express.Router();
const LaserModel = require('../models/LaserModel')
const laserModel = new LaserModel();

router.get('/', async function (req, res, next) {

    if (!req.query["laserID"]) {
        return res.redirect('/');
    }

    var laser = await laserModel.getById(req.query['laserID']);

    var checked = laser.PlayVoiceAnnouncements === 1 ? 'checked' : '';

    res.render('edit-laser', {Name:laser.Name, laserID:laser.LaserID, Checked:checked});

});

router.post('/', function (req, res, next) {

    if (!req.session.user && process.env.NODE_ENV !== 'development') {
        return res.redirect('/login');
    }

    req.body.voiceAnnouncements = req.body.voiceAnnouncements === 'on' ? 1 : 0;

    laserModel.update(req.body)
    .then(()=> {res.redirect(`/edit-laser?message=Laser ${ req.body.name } has been updated.&laserID=${req.body.laserID}`)})
    .catch(err => {res.redirect(`/edit-laser?error=${err}&laserID=${req.body.laserID}`)})

 });

module.exports = router;
