const express = require('express');
const router = express.Router();
const OperatorModel = require('../models/OperatorModel')
const operatorModel = new OperatorModel();

router.get('/', async function (req, res, next) {

    if (!req.query["operatorID"]) {
        return res.redirect('/');
    }

    var operator = await operatorModel.getById(req.query['operatorID']);

    res.render('edit-operator', { Name: operator.Name, OperatorID: operator.OperatorID });

});

router.post('/', function (req, res, next) {

    if (!req.session.user && process.env.NODE_ENV !== 'development') {
        return res.redirect('/login');
    }

    operatorModel.update(req.body)
        .then(() => { res.redirect(`/edit-operator?message=Laser ${req.body.operator} has been updated.&laserID=${req.body.operatorID}`) })
        .catch(err => { res.redirect(`/edit-operator?error=${err}&laserID=${req.body.operatorID}`) })

});

module.exports = router;
