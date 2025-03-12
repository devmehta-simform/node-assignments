import fs from "fs";
import path from "path";
import multer from "multer";
import { CustomError } from "../utils/error.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const uploadDir = path.resolve(__dirname, "../uploads/");
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir);
		}
		cb(null, uploadDir);
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

export const handleUpload = (req, res) => {
	const multerMiddleware = upload.single("file");

	multerMiddleware(req, res, (err) => {
		if (err) {
			res.statusCode = 500;
			res.end("File upload failed: " + err.message);
			throw new CustomError("File upload failed: " + err.message, 500);
		}

		res.writeHead(200, { "Content-Type": "text/plain" });
		res.end("File uploaded successfully");
	});
};
