const express = require('express');
const router = express.Router();
const CompanyModel = require('../../models/CompanyModel');
const companyModel = new CompanyModel();

router.get('/', function (req, res, next) {
  res.render('admin/add-company');
});

router.post('/', function (req, res, next) {

  req.body.enabled = req.body.enabled === undefined ? 0 : 1;

  companyModel.create(req.body.company, req.body.enabled)
    .then(() => {
      res.redirect(`/admin/add-company?message=Company ${req.body.company} has been added.`)
    }).catch(err => {
      res.redirect(`/admin/add-company?error=${err}`);
    })
});

module.exports = router;
