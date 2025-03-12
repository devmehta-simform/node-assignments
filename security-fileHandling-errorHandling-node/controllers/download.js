import fs from "fs";
import path from "path";
import { COMMON_MESSAGES, CustomError } from "../utils/error.js";

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
		const fsReadStream = fs.createReadStream(
			path.resolve(__dirname, "../uploads/", fileId + foundExt)
		);
		fsReadStream.pipe(res);
		return;
	} else {
		throw new CustomError(COMMON_MESSAGES.NOT_FOUND, 404);
	}
};
