const nodemailer = require("nodemailer");
const mail = process.env.MAILER_EMAIL;
const password = process.env.MAILER_PASSWORD;

async function emailSender(userEmail, token) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: mail,
      pass: password,
    },
  });

  const info = await transporter.sendMail({
    from: "bllog site", // sender address
    to: userEmail, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<h2>Hello!</h2></br><a href="http://localhost:8000/api/v1/backend/auth/emailverify/${token}">Link</a>`, // html body
  });
}

module.exports = emailSender;
