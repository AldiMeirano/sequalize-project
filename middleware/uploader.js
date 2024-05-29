const { join } = require("path");
const multer = require("multer");

const uploader = (filePrefix, folderName) => {
  const defaultDir = join(__dirname, "../public");

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const destination = folderName
        ? join(defaultDir, folderName)
        : defaultDir;
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      const originalnameParts = file.originalname.split(".");
      const fileExtension = originalnameParts[originalnameParts.length - 1];
      const newFileName = filePrefix + Date.now() + "." + fileExtension;

      cb(null, newFileName);
    },
  });

  return multer({ storage });
};

module.exports = uploader;
