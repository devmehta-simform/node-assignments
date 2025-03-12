import http from "http";
import { handleUpload } from "./controllers/upload.js";
import { handleDownload } from "./controllers/download.js";
import { COMMON_MESSAGES } from "./utils/error.js";
import { handleSignin } from "./controllers/signin.js";
import { handleSignup } from "./controllers/signup.js";

const server = http.createServer((req, res) => {
	if (req.method === "POST" && req.url.startsWith("/signup")) {
		handleSignup(req, res)
			.then(() => {
				res.statusCode = 200;
				res.end(COMMON_MESSAGES.SUCCESS);
			})
			.catch((error) => {
				res.statusCode = error.statusCode;
				res.end(error.message);
			});
	} else if (req.method === "POST" && req.url === "/signin") {
		handleSignin(req, res);
	} else if (req.method === "POST" && req.url === "/upload") {
		try {
			handleUpload(req, res);
		} catch (error) {
			res.statusCode = error.statusCode;
			res.end(error.message);
		}
	} else if (req.method === "GET" && req.url.startsWith("/download")) {
		try {
			handleDownload(req, res);
		} catch (error) {
			res.statusCode = error.statusCode;
			res.end(error.message);
		}
	} else {
		res.statusCode = 404;
		res.end(COMMON_MESSAGES.ROUTE_NOT_FOUND);
	}
});

server.listen(3000, () => {
	console.log("server is up and running...");
});
