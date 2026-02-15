const nodemailer = require("nodemailer");

exports.sendEmail = async (to, pdfPath) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yourgmail@gmail.com",
      pass: "APP_PASSWORD"
    }
  });

  await transporter.sendMail({
    from: "MyTickitSpot <yourgmail@gmail.com>",
    to,
    subject: "🎟 Your Ticket – MyTickitSpot",
    html: "<h3>Your ticket is attached</h3>",
    attachments: [
      { path: pdfPath }
    ]
  });
};
