const express = require('express')
const usersCtrl = require('../../controller/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn')


const router = express.Router()

router.post('/',usersCtrl.create)

router.post('/login',usersCtrl.login)
//delete
router.delete("/delete-user", usersCtrl.deLete);
// make sure you are logged in ensure is middle ware

router.get("/check-token", ensureLoggedIn, usersCtrl.checkToken);

router.put("/update", usersCtrl.updatedUser);

//TODO add middle multer
router.post("/recipes", usersCtrl.newRecipe);


module.exports = router