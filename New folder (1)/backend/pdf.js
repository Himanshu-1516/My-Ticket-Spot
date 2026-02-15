const PDFDocument = require("pdfkit");
const fs = require("fs");

exports.generatePDF = (data)=>{
  return new Promise(resolve=>{
    const doc = new PDFDocument();
    const filePath = `tickets/${data.bookingId}.pdf`;

    doc.pipe(fs.createWriteStream(filePath));
    doc.fontSize(20).text("MyTickitSpot Ticket", {align:"center"});
    doc.moveDown();

    doc.text(`Booking ID: ${data.bookingId}`);
    doc.text(`Name: ${data.name}`);
    doc.text(`Event: Live Concert 2026`);
    doc.text(`Date: 20 Feb 2026`);
    doc.text(`Seats: ${data.seats}`);

    doc.end();
    resolve(filePath);
  });
};
