const joi = require("joi")
const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    headline: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    types: {
        type: String,
        default:"Blog"
    },
    author: {
        type: String,
        default: "Sudip Acharya"
    },
    image: {
        type: String
    },
    image_public_id: {
        type: String
    },
    key: [{
        type: String
    }]
}, { timestamps: true })

function checkPostInputs(data) {
    let schema = joi.object({
        headline: joi.string().min(3).required(),
        desc: joi.string().required()
    })
    return schema.validate(data).error;
}
checkPostInputs()


module.exports.postModel = mongoose.model("post", postSchema)
module.exports.checkPostInputs = checkPostInputs;