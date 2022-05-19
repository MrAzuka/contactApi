const express = require("express")
const morgan = require("morgan")
const helmet = require("helmet")
const xss = require("xss-clean")
const cors = require("cors")
const path = require("path")
const expressLayout = require('express-ejs-layouts')
require('dotenv').config()
const {connectDB} = require('./src/db/connectDB')
const apiRoutes = require('./src/routes/contactsRoute')
const authRoutes = require('./src/routes/authRoutes')
const adminRoutes = require('./src/routes/adminRoutes')

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
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src', 'views'))

// Middleware
// Note: Always place your middleware before your routes.
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(morgan('dev'))
app.use(xss())
app.use(helmet())


// Seed Admin into the Database
const {seedAdmin} = require('./src/seeders/admin')
seedAdmin()

// Using Routes
app.use('/auth', authRoutes)
app.use(adminRoutes)
app.use(apiRoutes)

// Port Listening
const port = process.env.PORT || 5000
app.listen(port, ()=>{console.log(`Server running on port ${port}`)})
