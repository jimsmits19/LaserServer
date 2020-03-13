const express = require('express');
const router = express.Router();
const UserModel = require('../../models/UserModel');
const hash = require('pbkdf2-password')()

router.get('/', function (req, res, next) {
  res.render('admin/add-user');
});

router.post('/', function (req, res, next) {

  if (!req.session.user && process.env.NODE_ENV !== 'development') {
    res.redirect('/login');
  }

  hash({ password: req.body.password }, async function (err, pass, salt, hash) {

    if (err) throw err;

    req.body.enabled = req.body.enabled === undefined ? 0 : 1;
    req.body.admin = req.body.admin === undefined ? 0 : 1;

    new UserModel().create(
      req.body.companyId,
      req.body.userName,
      hash,
      salt,
      req.body.firstName,
      req.body.lastName,
      req.body.enabled,
      req.body.admin)
      .then(() => {
        res.redirect(`/admin/add-user?message=User ${req.body.userName} has been added to the database.`)
      })
      .catch(err => {
        res.redirect(`/admin/add-user?error=${err}`)
      });
  })
});

module.exports = router;
