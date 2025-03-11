import { readFile } from "fs";
import http from "http";
const server = http.createServer((req, res) => {
	switch (req.url) {
		case "/html":
			res.writeHead(200, { "Content-Type": "text/html" });
			res.end("<h1>hello from <u>HTML</u></h1>");
			return;

		case "/json":
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ dataFormat: "json", data: "hello from json" }));
			return;

		case "/html-file":
			readFile("./page.html", (err, data) => {
				if (err) {
					res.writeHead(500);
					res.end("internal server error");
					return;
				} else {
					res.writeHead(200, { "Content-Type": "text/html" });
					res.end(data);
					return;
				}
			});
			return;

		case "/text-file":
			readFile("./text.txt", (err, data) => {
				if (err) {
					res.writeHead(500);
					res.end("internal server error");
					return;
				} else {
					res.writeHead(200, { "content-type": "text/plain" });
					res.end(data);
					return;
				}
			});
			return;
		default:
			res.writeHead(404);
			res.end("not found!");
			return;
	}
});
server.listen(3000, () => {
	console.log("server up and running...");
});
