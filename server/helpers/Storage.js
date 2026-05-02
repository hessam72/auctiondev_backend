const multer = require('multer');
const path = require('path');

function storage(name) {
  return multer.diskStorage({
    destination(req, file, cb) {
      cb(null, `public/uploads/${name ? `${name}/` : ''}`);
    },
    // By default, multer removes file extensions so let's add them back
    filename(req, file, cb) {
      cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
  });
}

module.exports = storage;
