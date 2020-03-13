const express = require('express');
const router = express.Router();
const LaserStatusModel = require('../models/LaserStatusModel')
const laserStatusModel = new LaserStatusModel();

router.post('/', async function (req, res, next) {

    //TODO: if not exists create else update.
    try {
        //let laser = await laserStatusModel.count(req.body.laserguid);

        let ucpisrunning = req.body.ucpisrunning === 'True' ? 1 : 0; 
        //if (laser[0].Count === 0) {
            await laserStatusModel.create(req.body.laserguid, req.body.operatorid, req.body.macready, req.body.macstate, req.body.macbusy, req.body.jobname, ucpisrunning);
            res.sendStatus(201);
        // }
        // else {
        //     let laserStatus = {
        //         operatorId : req.body.operatorid,
        //         macReady : req.body.macready, 
        //         macState : req.body.macstate, 
        //         macBusy : req.body.macbusy,
        //         jobName : req.body.jobname,
        //         laserId : req.body.laserguid,
        //         ucpisrunning : ucpisrunning
        //     }
        //     await laserStatusModel.update(laserStatus)
        //     res.sendStatus(200)
        //}
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
});

module.exports = router;