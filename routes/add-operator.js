const express = require('express');
const router = express.Router();
const OperatorModel = require('../models/OperatorModel')
const operatorModel = new OperatorModel();


router.get('/', function (req, res, next) {
    res.render('add-operator');
});

router.post('/', function (req, res, next) {
   
    if (!req.session.user && process.env.NODE_ENV !== 'development') {
        return res.redirect('/login');
    }

    operatorModel.create(req.body.operator, req.session.user.CompanyID)
        .then(()=>{res.redirect(`/add-operator?message=Operator ${req.body.operator} has been added.`)})
        .catch(err =>{
            res.redirect(`/add-operator?error=${err}`);
        })
 });

module.exports = router;
