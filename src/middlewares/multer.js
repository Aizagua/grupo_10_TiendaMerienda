const multer = require("multer");
const path = require('path');
const crypto = require ('crypto');

function generateRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/images'))
    },
    filename: function (req, file, cb) {
      const imageName = generateRandomString(8) + Date.now() + path.extname(file.originalname)
      cb(null, imageName)
    }
  })

const uploadFile = multer({ storage: storage });
module.exports = uploadFile;
