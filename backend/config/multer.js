import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/temp");
    },

    filename(req, file, cb) {
        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 100000);

        cb(
            null,
            uniqueName + path.extname(file.originalname)
        );
    },
});

const fileFilter = (req, file, cb) => {
    const allowed = /jpg|jpeg|png|webp|pdf/;

    const extension = allowed.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mime = allowed.test(file.mimetype);

    if (extension && mime) {
        return cb(null, true);
    }

    cb(new Error("Invalid File Type"));
};

const upload = multer({
    storage,
    fileFilter,
});

export default upload;