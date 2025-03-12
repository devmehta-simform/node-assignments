import fs from "fs";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export const handleDownload = (req, res) => {
	const fileId = req.url.split("/")[2];
	const exts = [".jpeg", ".jpg", ".png"];
	let foundExt = null;
	for (const ext of exts) {
		if (fs.existsSync(path.resolve(__dirname, "../uploads/", fileId + ext))) {
			foundExt = ext;
			break;
		}
	}
	if (foundExt !== null) {
		res.writeHead(200, {
			"Content-Type": "application/octet-stream",
			"Content-Disposition": "attachment; filename='picture.png'",
		});
		fs.createReadStream(
			path.resolve(__dirname, "../uploads/", fileId + foundExt)
		).pipe(res);
	} else {
		res.statusCode = 404;
		res.end();
		return;
	}
};
