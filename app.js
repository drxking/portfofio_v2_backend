const express = require("express");
const cors = require("cors")
require("dotenv").config()
require("./config/db")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const path = require('path')
const morgan = require("morgan")

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
    origin: ["https://sudipacharya456.com.np/","https://pkxrwbpk-5173.inc1.devtunnels.ms/"],
    // origin:"*",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}))

app.use(morgan("dev"))
app.use((req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', 'h);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});



app.use("/api", apiRouter)
app.use("/admin", adminRouter)



app.use((err, req, res, next) => {
    if (err) {
        res.status(400).json({ message: err.message });
    } else {
        next();
    }
});

app.listen(PORT, () => {
    console.log(`Listening at Port ${PORT}`)
})