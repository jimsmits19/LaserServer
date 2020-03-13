var express = require('express');
var router = express.Router();
const UserModel = require('../models/UserModel')

router.get('/', async function (req, res, next) {

    try {

        const usersData = await new UserModel().getAll()

        for (let i = 0; i < usersData.length; i++) {
            delete usersData[i].PasswordHash;
            delete usersData[i].PasswordSalt;
            usersData[i].Action = `<a href="edit-user?userId=${usersData[i].UserID}">edit user</a>`;
        }

        res.send(usersData);
    } catch (error) {
        console.log(error)
    }

});

module.exports = router;
