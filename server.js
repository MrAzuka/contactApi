const express = require("express")
require('dotenv').config()
const {connectDB} = require('./db/connectDB')
const apiRoutes = require('./routes/contactsRoute')
const authRoutes = require('./routes/authRoutes')

// Initialise app
const app = express()

// Connect Database
connectDB()

// Middleware
// Note: Always place your middleware before your routes.
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Seed Admin into the Database
const {seedAdmin} = require('./seeders/admin')
seedAdmin()
// Using Routes
app.use('/auth', authRoutes)
app.use(apiRoutes)

// Port Listening
const port = process.env.PORT || 5000
app.listen(port, ()=>{console.log(`Server running on port ${port}`)})
