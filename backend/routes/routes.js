const router = require("express").Router()
const usersController = require("../controllers/usersController")
router.get("/get", (req, res) => {
    res.send("default api")
})
router.post("/registeruser", usersController.registerUser) //register new user
router.get("/getusers", usersController.getUsers) // get all users
router.post("/deleteuser/:id", usersController.deleteUser) // delete user
router.post("/updateuserprofile/:id", usersController.updateProfile) // update
module.exports = router;

