const express = require('express');
const router = express.Router();
const CompanyModel = require('../models/CompanyModel');

router.get('/', async function(req, res, next) {

    const companies = await new CompanyModel().getAll();

    for (let index = 0; index < companies.length; index++) {
        const element = companies[index];
        element.ViewStatus = `<a href="edit-company?companyID=${element.CompanyID}">Edit Company</a>`;
    }

    res.send(companies);
});

module.exports = router;
