const express = require("express");
const cors = require("cors")
require("dotenv").config()
require("./config/db")

const apiRouter = require("./routes/apiRouter")
const adminRouter = require("./routes/adminRouter")

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use("/api", apiRouter)
app.use("/admin", adminRouter)

app.listen(PORT, () => {
    console.log(`Listening at Port ${PORT}`)
})