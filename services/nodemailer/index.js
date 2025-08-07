
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'valiantcodez@gmail.com',
    pass: 'diwm dqjt dmnu atss'
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: 'valiantcodez@gmail.com',
      to,
      subject,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    
    return {
      success: true,
      messageId: result.messageId,
      message: 'Email sent successfully'
    };
  } catch (error) {
    console.error('Error sending email:', error);
    
    return {
      success: false,
      error: error.message,
      message: 'Failed to send email'
    };
  }
};

module.exports = sendEmail;