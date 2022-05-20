require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const helmet = require("helmet")
const xss = require("xss-clean")
const cors = require("cors")
const passport = require('passport')
const rateLimiter = require('express-rate-limit')
const {connectToDB} = require('./src/utils/connectToDB')
const indexRoutes = require('./src/routes/indexRoutes')
const contactRoutes = require('./src/routes/contactsRoutes')
const authRoutes = require('./src/routes/authRoutes')
const adminRoutes = require('./src/routes/adminRoutes')
const googleSignInRoutes = require('./src/routes/googleSignInRoutes')
const {seedAdmin} = require('./src/seeders/admin')


// Initialise app
const app = express()

// Connect Database
connectToDB()


// Middleware
// Note: Always place your middleware before your routes.
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(morgan('dev'))
app.use(xss())
app.use(helmet())
app.use(
    rateLimiter({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // limit each IP to 1000 requests per windowMs
    })
  )


// Seed Admin into the Database
seedAdmin()

// Using Routes
app.use(indexRoutes)
app.use('/api/v2/auth', authRoutes)
app.use('/api/v2/admin',adminRoutes)
app.use('/api/v2/contact',contactRoutes)
app.use(googleSignInRoutes)

// Port Listening
const port = process.env.PORT || 5000
app.listen(port, ()=>{console.log(`Server running on port ${port}`)})
