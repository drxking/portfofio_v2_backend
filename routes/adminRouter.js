const express = require('express')
const router = express.Router()
const { loginController } = require("../controllers/adminController")

router.post("/", loginController)


module.exports = router