const dbUtils = require('../utils/dbUtils');

exports.checkEmail = async (req, res) => {
    try {
        const { email } = req.body;
        console.log("Request body:", req.body);

        // Use utility function to check if email exists and retrieve username
        const username = await dbUtils.getUsernameByEmail(email);

        if (username) {
            req.session.email = email;
            return res.status(200).json({ username, message: 'Email exists' });
        } else {
            return res.status(404).json({ message: 'Email does not exist' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.validatePassword = async (req, res) => {
    const { password } = req.body;
    const email = req.session.email;

    if (!email) {
        return res.status(400).json({ message: 'Email not found in session. Please start from the beginning.' });
    }

    try {
        // validate password with the user's email
        const user = await dbUtils.getUserByEmailAndPassword(email, password);

        if (user) {
            // Clear email from session once validated
            req.session.email = null;
            return res.status(200).json({ message: 'Login successful', user });
        } else {
            return res.status(401).json({ message: 'Invalid password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
