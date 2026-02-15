const twilio = require("twilio");
const client = twilio("TWILIO_SID","TWILIO_AUTH");

exports.sendWhatsApp = async (phone, bookingId)=>{
  await client.messages.create({
    from:"whatsapp:+14155238886",
    to:`whatsapp:${phone}`,
    body:`🎟️ MyTickitSpot Ticket Confirmed!
Booking ID: ${bookingId}
Ticket sent to email.
Download anytime from MyTickitSpot.`
  });
};
