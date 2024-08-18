const { cloudinary } = require("../config/multer");
const { postModel, checkPostInputs } = require("../models/postModel")

module.exports.postController = async (req, res, next) => {
    try {
        let { headline, desc } = req.body;
        if (req.file) {
            let result = checkPostInputs({ headline, desc })
            if (result) return res.json(result.message);
            const post = await postModel.create({ headline: req.body.headline, desc: req.body.desc, image: req.file.path, image_public_id: req.file.filename })
            res.json({ status: "success", message: `${post} posted` }).status(201)
        }
        else {
            res.json({ status: "failure", message: `Image required` }).status(201)
        }
    }
    catch (err) {
        console.log(err.message)
        next(err)
        res.json({ status: "failure" }).status(500)
    }
}

module.exports.getController = async (req, res) => {
    try {
        const posts = await postModel.aggregate([{ $project: { headline: 1, desc: 1, author: 1, image: 1, createdAt: 1 } }])
        posts.reverse()
        res.json(posts).status(200)
    } catch (err) {
        console.log(err.message)
        res.json({ status: "failure", message: `Some Thing went wrong` }).status(201)
    }
}
module.exports.getSingleController = async (req, res) => {
    try {
        let post = await postModel.findOne({ _id: req.params.id })
        res.json(post)
    }
    catch (err) {
        console.log(err.message)
        res.json({ status: "failure", message: `Some Thing went wrong` }).status(201)
    }
}

module.exports.patchController = async (req, res) => {
    try {
        if (req.file) {
            let post = await postModel.findOneAndUpdate({ _id: req.params.id }, { headline: req.body.headline, desc: req.body.desc, image: req.file.path, image_public_id: req.file.filename })
            await cloudinary.uploader.destroy(post.image_public_id)
            res.send({ data: post, status: "success" }).status(201)
        } else {
            let post = await postModel.findOneAndUpdate({ _id: req.params.id }, { headline: req.body.headline, desc: req.body.desc })
            res.send({ data: post, status: "success" }).status(201)
        }
    }
    catch (err) {
        console.log(err.message)
        res.json({ status: "failure", message: `Some Thing went wrong` }).status(201)
    }
}

module.exports.deleteController = async (req, res) => {
    try {
        let post = await postModel.findOneAndDelete({ _id: req.params.id })
        let result = await cloudinary.uploader.destroy(post.image_public_id)
        res.send({ data: [post, result], status: "success", message: "Deleted Successfully" }).status(200)
    }
    catch (err) {
        console.log(err.message)
        res.json({ status: "failure", message: `Some Thing went wrong` }).status(201)
    }
}
