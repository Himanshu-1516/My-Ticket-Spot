const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

exports.generatePDF = async (data) => {
  const dir = path.join(__dirname, "../tickets");

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const filePath = path.join(dir, `${data.bookingId}.pdf`);
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(18).text("MyTickitSpot Ticket", { align: "center" });
  doc.moveDown();
  doc.text(`Booking ID: ${data.bookingId}`);
  doc.text(`Event: ${data.event}`);
  doc.text(`Name: ${data.name}`);
  doc.text(`Email: ${data.email}`);
  doc.text(`Status: Confirmed`);

  doc.end();

  return filePath;
};
