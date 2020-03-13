const express = require('express');
const router = express.Router();
const CompanyModel = require('../../models/CompanyModel')
const companyModel = new CompanyModel();

router.get('/', async function (req, res, next) {

  if (!req.query['companyID']) {
    res.redirect('/');
  }

  let company = await companyModel.getById(req.query['companyID'])

  //NOTE: b/c the HTML input type="checkbox" check state is controlled by existence of the checked attribute...
  let enabled = company.Enabled === 0 ? "" : "checked";

  res.render('admin/edit-company', { CompanyID: company.CompanyID, Name: company.Name, Enabled: enabled });

});

router.post('/', function (req, res, next) {

  if (!req.session.user && process.env.NODE_ENV !== 'development') {
    res.redirect('/login');
  }

  req.body.Enabled = req.body.Enabled === 'on' ? 1 : 0;

  companyModel.update(req.body)
    .then(() => {
      res.redirect(`/admin/edit-company?message=Company ${req.body.Name} has been updated.&companyID=${req.body.CompanyID}`)
    }).catch(err => {
      res.redirect(`/admin/edit-company?error=${err}&companyID=${req.body.CompanyID}`);
    })
});

module.exports = router;