const express = require('express')
const usersCtrl = require('../../controller/api/users')


const router = express.Router()

router.post('/',usersCtrl.create)


module.exports = router