import multer, { Options } from "multer";
import path from "path";

const uploadsConfig = {
  limits: {
    fileSize: 12 * 1024 * 1024, //8MB
  },
  fileFilter: (req, file, cb) => {
    const mimeType = ["image/png", "image/jpeg", "image/gif", "image/jpg"];

    if (!mimeType.includes(file.mimetype)) {
      return cb(null, false);
    }

    cb(null, true);
  },
} as Options;

const createConfig = (folder: string) => ({
  ...uploadsConfig,
  storage: multer.diskStorage({
    destination: path.join(__dirname, "..", "..", "uploads", folder),
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

const userProfileUpload = multer(createConfig("profile"));
const postUploadConfig = multer(createConfig("post"));
const newsletterUploadConfig = multer(createConfig("newsletter"));
const projectUploadConfig = multer(createConfig("project"));
const programUploadConfig = multer(createConfig("program"));
const quizUploadConfig = multer(createConfig("quizzes"));

export {
  userProfileUpload,
  postUploadConfig,
  newsletterUploadConfig,
  projectUploadConfig,
  programUploadConfig,
  quizUploadConfig
};
