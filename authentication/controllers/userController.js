const dbUtils = require('../utils/dbUtils');


// Controller to create a new user
async function addUser(req, res) {
    const { email, password, role } = req.body;
    
    if (!email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const result = await dbUtils.createUser(email, password, role);

        if (result.exists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        res.status(201).json({
            id: result.insertId,
            email,
            role,
            message: 'User created successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Controller to get user_id by email
async function getUserId(req, res) {
    const { email } = req.params;
    const decodedEmail = decodeURIComponent(email);

    try {
        const userId = await dbUtils.getUserIdByEmail(decodedEmail);
        if (!userId) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user_id: userId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Controller to add user profile
async function addUserProfile(req, res) {
    const { user_id, full_name, phone, date_of_birth, address, gender } = req.body;
console.log(req.body);
     try {
         const result = await dbUtils.addUserProfile({
             user_id,
             full_name,
             phone,
             date_of_birth,
             address,
             gender
         });

         res.status(201).json({ message: 'Profile created successfully', profile_id: result.insertId });
     } catch (error) {
         console.error(error);
         res.status(500).json({ message: 'Server error' });
     }
}

module.exports = { getUserId, addUserProfile, addUser };
