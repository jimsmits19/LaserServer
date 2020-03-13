const express = require('express');
const router = express.Router();

const UserModel = require('../models/UserModel')

router.get('/', function (req, res) {
    res.render('login');
});

router.post('/', function (req, res) {

    new UserModel().authenticate(req.body.username, req.body.password, function (error, user) {
        if (error) {
            return res.redirect('/login?error=' + error);
        }

        if (user) {
            // Regenerate session when signing in to prevent fixation
            req.session.regenerate(function () {
                req.session.user = user;
                res.redirect('/');
            });
        } else {
            res.redirect('/login?failed=1');
        }
    });
});


module.exports = router