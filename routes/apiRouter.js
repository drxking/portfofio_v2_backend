const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const { postController, getController, getSingleController } = require("../controllers/apiController")


router.get("/posts", getController)
router.post("/posts", postController)
router.get("/posts/:id", getSingleController)
router.post("/is-logged-in", (req, res) => {
    try {
        let { token } = req.body;
        if (token) {
            let result = jwt.verify(token, process.env.JWT_KEY)
            if (result) {
                return res.json({ status: "success", message: result })
            }
            res.json({ status: "failure" })

        }
        res.json({ status: "failure" })
    } catch (err) {
        console.log(err.message)
        if (err.message == "invalid signature") {
            res.json({ status: "failure" })

        }
    }
})
module.exports = router 