const nodemailer = require('nodemailer');

// Email Service for password reset
exports.sendResetPasswordEmail = (email, resetLink) => {
    const transporter = nodemailer.createTransport({
        // Configure your email service (Gmail, SendGrid, etc.)
    });

    const mailOptions = {
        to: email,
        from: 'yourapp@example.com',
        subject: 'Password Reset',
        text: `Click the link to reset your password: ${resetLink}`
    };

    return transporter.sendMail(mailOptions);
};
