const jwt = require("jsonwebtoken")

module.exports.loginController = (req, res) => {
    let { username, password } = req.body;
    if (username == process.env.ADMIN_USERNAME && password == process.env.ADMIN_PASS) {
        let token = jwt.sign(process.env.ADMIN_USERNAME, process.env.JWT_KEY)
        return res.json({ status: "success", token: token, message: "Logged In" }).status(200);
    }
    res.json({ status: "failure", message: "Username or Password doesnot match!" }).status(304)

}