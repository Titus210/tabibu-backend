const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/User');
const emailService = require('../services/emailService');


// Login Controller
exports.login = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({ message: 'Something is not right', user });
        }

        req.login(user, { session: false }, (err) => {
            if (err) return res.send(err);

            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ user, token });
        });
    })(req, res, next);
};

// Register Controller
exports.register = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await User.create({
            email,
            password_hash: hashedPassword, // Assuming this is the field for the hashed password
            user_type: role
        });

        // Automatically log the user in
        req.login(user, { session: false }, (err) => {
            if (err) return res.status(500).send(err);

            const token = jwt.sign({ id: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ user, token });
        });

    } catch (err) {
        res.status(500).send({ message: 'Error registering user', error: err });
    }
};




// Forgot Password Controller
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).send({ message: 'User not found' });

        const token = crypto.randomBytes(20).toString('hex');
        const resetLink = `http://localhost:30002.com/reset-password?token=${token}`;

        user.update({ reset_password_token: token, reset_password_expires: Date.now() + 3600000 });

        await emailService.sendResetPasswordEmail(user.email, resetLink);
        res.status(200).send({ message: 'Reset link sent to email' });
    } catch (err) {
        res.status(500).send(err);
    }
};
