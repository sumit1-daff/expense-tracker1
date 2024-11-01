const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const sendResetLink = async (email) =>{
    console.log("inside reset password email function");
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,  
      auth: {
        user: process.env.EMAIL_ID, 
        pass: process.env.APP_PASSWORD,
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: user.email,
      subject: 'Verify your Email',
      text: `Click on the link to verify your mail: http://localhost:3000/auth/verify-email?token=${token} \n\nIf you didn't register, you can ignore this email.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return false;
      }
      console.log("Email sent");
    });
    return true;
    return true;
}

module.exports = sendResetLink;