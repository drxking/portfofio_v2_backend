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
        type: String
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    key: [{
        type: String
    }]
}, { timestamps: true })

function checkPostInputs(data) {
    let schema = joi.object({
        headline: joi.string().min(3).required(),
        desc: joi.string().required(),
        author: joi.string().required()
    })
    return schema.validate(data).error;
}
checkPostInputs()


module.exports.postModel = mongoose.model("post", postSchema)
module.exports.checkPostInputs = checkPostInputs;