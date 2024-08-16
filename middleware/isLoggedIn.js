const jwt = require("jsonwebtoken")
module.exports.isLoggedIn = (req, res, next) => {
    let token = req.cookies.token
    if (token) {
        try {
            let result = jwt.verify(token, process.env.JWT_KEY)
            if (result) {
                next()
            }
        }
        catch (err) {
            console.log(err.message)
            res.json({ status: "unauthorized" }).status(300)
        }

    }
    else {
        res.json({ status: "unauthorized" }).status(300)
    }
}