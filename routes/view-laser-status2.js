const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('view-laser-status2');
});

module.exports = router;
