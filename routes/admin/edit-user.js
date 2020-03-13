const express = require('express');
const router = express.Router();
const UserModel = require('../../models/UserModel')

const userModel = new UserModel();

router.get('/', async function (req, res, next) {

  if (!req.query['userId']) {
    res.redirect("/")
  }

  const user = await userModel.getById(req.query['userId']);

  let checked = user.Enabled === 1 ? "checked" : "";

  res.render('admin/edit-user', { userName: user.UserName, userId: user.UserID, firstName: user.FirstName, lastName: user.LastName, checked: checked });

});

router.post('/', async function (req, res, next) {

  if (!req.session.user && process.env.NODE_ENV !== 'development') {
    res.redirect('/login');
  }
  updateUser(req, res)

})

function updateUser(req,res) {

    req.body.enabled = req.body.enabled === 'on' ? 1 : 0;

    userModel.update(req.body)
    .then(() => {
      res.redirect(`/admin/edit-user?message=User ${req.body.userName} has been updated.&userId=${req.body.userId}`)
    })
    .catch(err => {
      res.redirect(`/admin/edit-user?error=${err}&userId=${req.body.userId}`)
    });
  }

module.exports = router;
