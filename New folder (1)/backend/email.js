const nodemailer = require("nodemailer");

exports.sendEmail = async (to, pdfPath)=>{
  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
      user:"yourmail@gmail.com",
      pass:"APP_PASSWORD"
    }
  });

  await transporter.sendMail({
    from:"MyTickitSpot <yourmail@gmail.com>",
    to,
    subject:"🎟️ Your Ticket – MyTickitSpot",
    text:"Your ticket is attached.",
    attachments:[
      { filename:"ticket.pdf", path:pdfPath }
    ]
  });
};
