const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

router.get("/download/:bookingId", (req, res) => {
  const bookingId = req.params.bookingId;
  const filePath = path.join(__dirname, "../tickets", `${bookingId}.pdf`);

  console.log("Trying to download:", filePath);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      error: "Ticket PDF not found",
      bookingId
    });
  }

  res.download(filePath);
});

module.exports = router;
