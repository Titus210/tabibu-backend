const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Log JWT Secret
console.log('JWT Secret:', process.env.JWT_SECRET);

// Local Strategy for email/password authentication
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ where: { email } });
                if (!user) return done(null, false, { message: 'User not found' });

                const isValidPassword = await bcrypt.compare(password, user.password_hash);
                if (!isValidPassword) return done(null, false, { message: 'Incorrect password' });

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

// JWT Strategy for token-based authentication
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        },
        async (jwtPayload, done) => {
            try {
                const user = await User.findByPk(jwtPayload.id);
                if (!user) return done(null, false, { message: 'User not found' });

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

module.exports = passport;
