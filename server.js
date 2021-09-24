const express = require("express")
const expressLayout = require('express-ejs-layouts')
require('dotenv').config()
const {connectDB} = require('./db/connectDB')
const apiRoutes = require('./routes/contactsRoute')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')

// Initialise app
const app = express()

// Connect Database
connectDB()

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

// Set Templating Engine
app.use(expressLayout)
app.set('view engine', 'ejs')

// Middleware
// Note: Always place your middleware before your routes.
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Seed Admin into the Database
const {seedAdmin} = require('./seeders/admin')
seedAdmin()

// Using Routes
app.use('/auth', authRoutes)
app.use(adminRoutes)
app.use(apiRoutes)

// Port Listening
const port = process.env.PORT || 5000
app.listen(port, ()=>{console.log(`Server running on port ${port}`)})
