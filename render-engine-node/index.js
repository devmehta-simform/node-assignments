import http from "http";
import fs from "fs";
import path from "path";
import ejs from "ejs";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const server = http.createServer((req, res) => {
	console.log(req.url);

	if (req.url.startsWith("/style.css")) {
		const filePath = path.join(__dirname, "public", "style.css");
		fs.readFile(filePath, (err, data) => {
			if (err) {
				res.statusCode = 500;
				res.end("Error reading CSS file");
				return;
			}
			res.writeHead(200, { "Content-Type": "text/css" });
			res.end(data);
		});
		return;
	}

	const filePath = path.join(__dirname, "views", "index.ejs");

	const data = {
		title: "Simple EJS Demo",
		name: "John Doe",
		date: new Date().toDateString(),
		description: "This is a simple demo of EJS rendering with basic styling!",
		items: ["Admin's Item 1", "Admin's Item 2", "Item 1", "Item 2"],
		isAdmin: true,
		theme: "light",
	};

	// Check the 'theme' query parameter for testing purposes
	if (req.url.includes("theme=dark")) {
		data.theme = "dark";
	}

	ejs.renderFile(filePath, data, {}, (err, str) => {
		if (err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Error rendering template");
			return;
		}

		res.writeHead(200, { "Content-Type": "text/html" });
		res.end(str);
	});
});

server.listen(3000, () => {
	console.log("Server up and running...");
});
