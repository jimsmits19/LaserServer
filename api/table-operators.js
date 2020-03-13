const express = require('express');
const router = express.Router();
const OperatorModel = require('../models/OperatorModel')
const operatorModel = new OperatorModel();

router.get('/', async function(req, res, next) {

    const operators = await operatorModel.getByCompanyId(req.session.user.CompanyID)

    for (let index = 0; index < operators.length; index++) {
        const element = operators[index];
        element.Action = `<a href="edit-operator?operatorID=${element.OperatorID}">edit operator</a>`;
    }

    res.send(operators);

});

module.exports = router;
