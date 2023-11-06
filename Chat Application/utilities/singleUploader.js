// Dependencies
const multer = require("multer");
const path = require("path");
const createError = require("http-errors");

function uploader(subfolder, allowedFileType, max_file_size, error_msg) {
  // file upload folder directory
  const upload_folder = `${__dirname}/../public/uploads/${subfolder}/`;
  // define the storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, upload_folder);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") + Date.now();
      cb(null, fileName + fileExt);
    },
  });

  // prepare the final multer upload object
  const upload = multer({
    storage: storage,
    limits: {
      files: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (allowedFileType.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(error_msg));
      }
    },
  });
  // return the upload object
  return upload;
}

module.exports = uploader;
