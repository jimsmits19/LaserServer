const express = require('express');
const router = express.Router();
const IdleTimeModel = require('../models/IdleTimeModel')

router.get('/', async function(req, res, next) {


    const result = await new IdleTimeModel().getAll()

    res.send(result);

});

module.exports = router;
