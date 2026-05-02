/* eslint-disable linebreak-style */
const multer = require('multer');
const S3 = require('../helpers/Storage');
const Rest = require('../helpers/Rest');
// eslint-disable-next-line consistent-return
function imageFilter(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    // eslint-disable-next-line no-param-reassign
    return Rest.badRequest('Only image files are allowed!');
  }
  cb(null, true);
}
// eslint-disable-next-line consistent-return
function attachFilter(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|pdf|zip|rar)$/)) {
    // eslint-disable-next-line no-param-reassign
    return Rest.badRequest('Only image files are allowed!');
  }
  cb(null, true);
}
function upload(storage) {
  // eslint-disable-next-line new-cap
  return multer({ storage: S3(storage), fileFilter: storage === 'product' ? attachFilter : imageFilter });
}

module.exports = upload;
