const express = require('express')
const router = express.Router()
const { loginController, getAdminController } = require("../controllers/adminController")
const { isLoggedIn } = require('../middleware/isLoggedIn')

router.post("/login", loginController)

router.get("/posts", isLoggedIn, getAdminController)

module.exports = router