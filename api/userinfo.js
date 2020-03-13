const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    const userInfo = {
        Message: '<a href="/login">Login</a>'
    }

    if (req.session.user !== undefined) {
        userInfo.Message = `Hello ${req.session.user.FirstName} ${req.session.user.LastName} | <a href="/logout">Logout</a>`
    }

    res.send(userInfo);
});

module.exports = router;
