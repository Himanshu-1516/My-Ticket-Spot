// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create tickets folder if not exists
const ticketsDir = path.join(__dirname, 'tickets');
if (!fs.existsSync(ticketsDir)) fs.mkdirSync(ticketsDir);

// Twilio setup (replace with your credentials)
const twilioClient = twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');
const twilioWhatsappFrom = 'whatsapp:+14155238886'; // Twilio sandbox number

// Email transporter (Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_email@gmail.com',      // Your Gmail
        pass: 'your_email_app_password'    // Gmail App password
    }
});

// Endpoint to generate PDF and send Email + WhatsApp
app.post('/send-ticket', async (req, res) => {
    try {
        const { name, email, phone, bookingId, event, qty, total } = req.body;
        if (!name || !email || !bookingId || !event || !qty || !total) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create PDF
        const pdfPath = path.join(ticketsDir, `${bookingId}.pdf`);
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(pdfPath));
        doc.fontSize(22).text("🎟 MyTickitSpot Ticket", { align: 'center' });
        doc.moveDown();
        doc.fontSize(16).text(`Booking ID: ${bookingId}`);
        doc.text(`Event: ${event}`);
        doc.text(`Name: ${name}`);
        doc.text(`Tickets: ${qty}`);
        doc.text(`Total: ₹${total}`);
        doc.end();

        // Wait for PDF to finish writing
        await new Promise(resolve => doc.on('finish', resolve));

        // Send Email
        const mailOptions = {
            from: 'your_email@gmail.com',
            to: email,
            subject: 'Your Ticket | MyTickitSpot',
            text: `Hi ${name}, your ticket for ${event} is attached.`,
            attachments: [{ path: pdfPath }]
        };
        await transporter.sendMail(mailOptions);

        // Send WhatsApp (if phone provided)
        if (phone) {
            await twilioClient.messages.create({
                from: twilioWhatsappFrom,
                to: `whatsapp:${phone}`,
                body: `Hi ${name}, your ticket for ${event} is confirmed. Booking ID: ${bookingId}`,
                mediaUrl: [`https://yourdomain.com/tickets/${bookingId}.pdf`] // Make PDF publicly accessible
            });
        }

        res.json({ message: 'Ticket sent via Email & WhatsApp successfully!' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.toString() });
    }
});

// Serve tickets folder publicly (optional for WhatsApp PDF link)
app.use('/tickets', express.static(ticketsDir));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
