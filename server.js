const express = require("express")
require('dotenv').config()
const {connectDB} = require('./db/connectDB')

// Initialise app
const app = express()

// Connect Database
connectDB()

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port = process.env.PORT || 5000
app.listen(port, ()=>{console.log(`Server running on port ${port}`)})
