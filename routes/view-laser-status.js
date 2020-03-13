const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  let laserId = req.query['laserid'];
  res.render('view-laser-status', { laserid: laserId });
});

module.exports = router;
