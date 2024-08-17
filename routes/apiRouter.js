const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const { postController, getController, getSingleController, patchController, deleteController } = require("../controllers/apiController")
const upload = require("../config/multer")
const { isLoggedIn } = require("../middleware/isLoggedIn")


router.get("/posts", getController)
router.post("/posts", isLoggedIn, upload.single("image"), postController)
router.get("/posts/:id", getSingleController)
router.patch("/posts/:id", isLoggedIn, patchController)
router.delete("/posts/:id", isLoggedIn, deleteController)

router.get("/is-logged-in", (req, res) => {
    try {
        let token = req.cookies.token;
        console.log(token)
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