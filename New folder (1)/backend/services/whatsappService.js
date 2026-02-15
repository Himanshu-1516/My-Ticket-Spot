const axios = require("axios");

exports.sendWhatsApp = async (phone, bookingId) => {
  await axios.post(
    "https://graph.facebook.com/v18.0/PHONE_NUMBER_ID/messages",
    {
      messaging_product: "whatsapp",
      to: phone,
      type: "text",
      text: {
        body: `🎟 Ticket Confirmed!\nBooking ID: ${bookingId}\nMyTickitSpot`
      }
    },
    {
      headers: {
        Authorization: "Bearer WHATSAPP_TOKEN"
      }
    }
  );
};
