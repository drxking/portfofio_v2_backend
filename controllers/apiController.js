const { postModel, checkPostInputs } = require("../models/postModel")

module.exports.postController = async (req, res) => {
    let { headline, desc, author } = req.body;
    let result = checkPostInputs({ headline, desc, author })
    if (result) return res.json(result.message);
    const post = await postModel.create(req.body)
    res.json(post)
}

module.exports.getController = async (req, res) => {
    const posts = await postModel.aggregate([{ $project: { headline: 1, desc: 1, author: 1, image: 1, createdAt:1} }])
    res.json(posts)
}
module.exports.getSingleController = async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id })
    res.json(post)
}