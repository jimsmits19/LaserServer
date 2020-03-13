const express = require('express');
const router = express.Router();
const LaserModel = require('../models/LaserModel')
const laserModel = new LaserModel();

router.get('/', async function(req, res, next) {

    const companyLasers = await laserModel.getByCompanyId(req.session.user.CompanyID)

    for (let index = 0; index < companyLasers.length; index++) {
        const element = companyLasers[index];
        element.ViewStatus = `<a href="view-laser-status?laserid=${element.LaserID}">view status</a><br /><a href="edit-laser?laserID=${element.LaserID}">edit laser</a>`;
    }

    res.send(companyLasers);

});

module.exports = router;
