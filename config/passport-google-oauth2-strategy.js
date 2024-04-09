const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/User');

// Load environment variables from .env file
require('dotenv').config();

passport.use(new googleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/user/auth/google/callback',
    passReqToCallback: true,
}, async function(request, accessToken, refreshToken, profile, done) {
    try {
        const user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
            return done(null, user);
        }
        if (!user) {
            // Create user and set it as req.user if not found
            const newUser = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            });
            if (newUser) {
                return done(null, newUser);
            }
        }
    } catch (error) {
        console.log('Error in Google Strategy Passport', error);
    }
}));

module.exports = passport;
