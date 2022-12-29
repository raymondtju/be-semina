const nodemailer = require("nodemailer");
const mustache = require("mustache");
const fs = require("fs");

const { emailAddress, emailPassword } = require("../../config");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: emailAddress,
    pass: emailPassword,
  },
});

const otpMail = (email, data) => {
  try {
    const template = fs.readFileSync("apps/views/email/otp.html", "utf8");

    let message = {
      from: emailAddress,
      to: email,
      subject: "OTP",
      html: mustache.render(template, data),
    };

    return transporter.sendMail(message);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  otpMail,
};
