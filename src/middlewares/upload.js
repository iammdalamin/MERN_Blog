const multer = require("multer");
const path = require("path");

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Uploads folder
  },
  filename: function (req, file, cb) {
    cb(null,Date.now() + path.extname(file.originalname)) ; // File name
  },
});

// Set up upload middleware
exports.upload = multer({ storage: storage }).single("file");
