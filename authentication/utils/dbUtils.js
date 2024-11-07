const pool = require('../config/database');

// Get user ID by email
async function getUserIdByEmail(email) {
    const [user] = await pool.execute('SELECT user_id FROM users WHERE email = ?', [email]);
    return user.length > 0 ? user[0].user_id : null;
}

// Add user profile
async function addUserProfile(profileData) {
    const { user_id, full_name, phone, date_of_birth, address, gender } = profileData;
    console.log(profileData);

    const query = `
        INSERT INTO user_profiles (user_id, full_name, phone, date_of_birth, address, gender)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    try {
        const [result] = await pool.execute(query, [user_id, full_name, phone, date_of_birth, address, gender]);
        return result;
    } catch (error) {
        console.error("Database error:", error.message); 
        throw error;
    }
}

// Check if user exists and add new user
async function createUser(email, password, role) {
    // Check if user already exists
    const [existingUser] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
        return { exists: true };
    }

    // Insert new user
    const [result] = await pool.execute(
        'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)',
        [email, password, role]
    );
    return { exists: false, insertId: result.insertId };
}


// get username by email
async function getUsernameByEmail(email) {
    const query = 'SELECT username FROM users WHERE email = ?';
    try {
        const [rows] = await pool.execute(query, [email]);
        if (rows.length > 0) {
            return rows[0].username;  // Return the username if email exists
        }
        return null;  // Return null if email doesn't exist
    } catch (error) {
        console.error("Database error:", error.message);
        throw error;
    }
}

module.exports = { getUserIdByEmail, addUserProfile, createUser,  getUsernameByEmail };
