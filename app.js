const express = require('express')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth.route.js')
const connectdb = require("./db/db.js")
const cookieParser = require("cookie-parser")
dotenv.config()
const app = express()
connectdb()

app.use(express.json())
app.use(cookieParser())


app.use('/api/auth',authRoutes)

// page not found error
app.use('*',(req,res)=>{
    res.json({msg : "Page not"})
})


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT} `);
})