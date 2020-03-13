const express = require('express');
const router = express.Router();

const CompanyModel = require('../models/CompanyModel');

router.get('/', async function(req, res, next) {

    let companies = await new CompanyModel().getAll();

    for (let index = 0; index < companies.length; index++) {
        companies[index].text = companies[index].Name;
        companies[index].value = companies[index].CompanyID;
        delete companies[index].Enabled;
        delete companies[index].CreatedDate;
        delete companies[index].ApiToken;
        delete companies[index].Name;
        delete companies[index].CompanyID; 
    }

    console.log(companies);
    

    res.send(companies);
});

module.exports = router;
