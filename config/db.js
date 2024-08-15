const mongoose = require("mongoose")


mongoose.connect(`${process.env.MONGO_URI}`)

let db = mongoose.connection;

db.on("error", (err) => {
    console.log(err)
})
db.on("open", () => {
    console.log("Connected to Database successfully")
})

module.exports = db;