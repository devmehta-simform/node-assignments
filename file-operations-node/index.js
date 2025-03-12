import http from "http";
import fs from "fs";
import path from "path";
import multer from "multer";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const uploadDir = path.join(__dirname, "uploads");
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

const server = http.createServer((req, res) => {
	if (req.method === "POST" && req.url === "/upload") {
		const multerMiddleware = upload.single("file");

		multerMiddleware(req, res, (err) => {
			if (err) {
				res.statusCode = 500;
				res.end("File upload failed: " + err.message);
				return;
			}

			res.writeHead(200, { "Content-Type": "text/plain" });
			res.end("File uploaded successfully");
		});
	} else {
		res.statusCode = 500;
		res.end("internal server error");
	}
});

server.listen(3000, () => {
	console.log("server is up and running...");
});
