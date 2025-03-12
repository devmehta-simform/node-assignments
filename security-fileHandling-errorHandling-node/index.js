import http from "http";
import { handleUpload } from "./middlewares/upload.js";
import { handleDownload } from "./middlewares/download.js";

const server = http.createServer((req, res) => {
	if (req.method === "POST" && req.url === "/upload") {
		handleUpload(req, res);
	} else if (req.method === "GET" && req.url.startsWith("/download")) {
		handleDownload(req, res);
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(3000, () => {
	console.log("server is up and running...");
});
