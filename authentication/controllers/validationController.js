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

