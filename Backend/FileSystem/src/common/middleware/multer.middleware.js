
import multer from "multer";
import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";

const uploadPath = "./src/module/file-upload";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdir(uploadPath, { recursive: true }, (err) => {
            if (err) {
                return cb(err);
            }

            cb(null, uploadPath);
        });
    },

    filename: function (req, file, cb) {
        crypto.randomBytes(16, function (err, raw) {
            if (err) {
                return cb(err);
            }

            const fileName = path.parse(file.originalname).name;
            const ext = path.extname(file.originalname);

            cb(null, `${fileName}-${raw.toString("hex")}${ext}`);
        });
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFiles = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif"
    ];

    if (allowedFiles.includes(file.mimetype)) {
        return cb(null, true);
    }

    return cb(new Error("File type not allowed"));
};

export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter
});
