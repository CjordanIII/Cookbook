const express = require('express')
const usersCtrl = require('../../controller/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn')
const router = express.Router()

router.post('/',usersCtrl.create)

router.post('/login',usersCtrl.login)
// make sure you are logged in ensure is middle ware
router.get("/check-token", ensureLoggedIn, usersCtrl.checkToken);


module.exports = router