const jwt = require("jsonwebtoken")

module.exports.loginController = (req, res) => {
    let { username, password } = req.body;
    if (username == process.env.ADMIN_USERNAME && password == process.env.ADMIN_PASS) {
        let token = jwt.sign(process.env.ADMIN_USERNAME, process.env.JWT_KEY)
        res.cookie("token", token, {
            secure: true,
            sameSite: "None",
            httpOnly: true
        })
        return res.json({ status: "success", message: "Logged In" }).status(200);
    }
    res.json({ status: "failure", message: "Username or Password doesnot match!" }).status(300)

}


module.exports.getAdminController = async (req, res) => {
    try {
        const posts = await postModel.aggregate([{ $project: { headline: 1, desc: 1, author: 1, image: 1, createdAt: 1 } }])
        res.json(posts).status(200)
    } catch (err) {
        console.log(err.message)
        res.json({ status: "failure", message: `Some Thing went wrong` }).status(201)
    }
}