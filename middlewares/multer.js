//ai assisted

const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // optional: limit 5MB
  }
});

module.exports = upload;
