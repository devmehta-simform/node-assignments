import http from "http";
import fs from "fs";
import path from "path";
import ejs from "ejs";
import i18n from "i18n";

i18n.configure({
	locales: ["en", "es", "fr", "ar"],
	directory: path.resolve("./locales"),
	defaultLocale: "en",
	objectNotation: true,
});

const server = http.createServer((req, res) => {
	if (req.url.startsWith("/style.css")) {
		const filePath = path.resolve("./public", "style.css");
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

	const filePath = path.resolve("./views", "index.ejs");
	const urlParams = new URLSearchParams(req.url.split("?")[1]);

	const lang = urlParams.get("lang") || "en";
	i18n.setLocale(lang);

	const data = {
		title: i18n.__("page.title"),
		name: "John Doe",
		greeting: i18n.__("page.greeting"),
		date: new Date().toLocaleString(lang),
		description: i18n.__("page.description"),
		itemsTitle: i18n.__("item.itemsTitle"),
		items: [
			i18n.__("item.item1"),
			i18n.__("item.item2"),
			i18n.__("item.item3"),
			i18n.__("item.item4"),
		],
		theme: "light",
		lang,
	};

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
