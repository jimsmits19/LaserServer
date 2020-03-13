const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  let admin = "";
  if (req.session.user && req.session.user.Admin === 1) {
    admin = '<li><a href="/admin">Admin</a></li>'
  }
  res.render('index', { Admin: admin });
});

module.exports = router;
