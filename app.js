const express = require("express");
const cors = require("cors")
require("dotenv").config()
require("./config/db")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const path = require('path')

const apiRouter = require("./routes/apiRouter")
const adminRouter = require("./routes/adminRouter")

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser("Hello"))
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "Hello"
}))
app.use(cors({
    origin: [`${process.env.CORS_ORIGIN}`, `${process.env.CORS_ORIGIN2}`],
    methods: ["POST", "GET"],
    credentials: true
}))

app.use((req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', 'h);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});



app.use("/api", apiRouter)
app.use("/admin", adminRouter)

app.listen(PORT, () => {
    console.log(`Listening at Port ${PORT}`)
})