const { postModel, checkPostInputs } = require("../models/postModel")

module.exports.postController = async (req, res) => {
    try {
        let { headline, desc } = req.body;
        let result = checkPostInputs({ headline, desc })
        if (result) return res.json(result.message);
        const post = await postModel.create({ headline: req.body.headline, desc: req.body.desc, image: req.file ? `${process.env.SERVER_URL}/images/${req.file.filename}` : "" })
        res.json({ status: "success", message: `${post} posted` }).status(201)
    }
    catch (err) {
        console.log(err.message)
        res.json({ status: "failure" }).status(500)
    }
}

module.exports.getController = async (req, res) => {
    const posts = await postModel.aggregate([{ $project: { headline: 1, desc: 1, author: 1, image: 1, createdAt: 1 } }])
    res.json(posts).status(200)
}
module.exports.getSingleController = async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id })
    res.json(post)
}