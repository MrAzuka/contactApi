require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth2').Strategy
const User = require('../models/Users')

const initializeGooglePassport = (passport) => {

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:  "http://127.0.0.1:5000/auth/google/callback",
        passReqToCallback: true
    },
        async (request, accessToken, refreshToken, profile, done) => {
            // check if user with the google id already exists
            const user = await User.findOne({ email: profile.emails[0].value })
            if (user) {
                return done(null, user)
            } else {
                // if user is not in db, add user to db
                const newUser = await User.create({
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    password: null,
                })

                return done(null, newUser)
            }
        }
    ));
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        }).select('-password')
    })
}

module.exports = initializeGooglePassport