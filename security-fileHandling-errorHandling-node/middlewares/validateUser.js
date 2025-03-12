import { CustomError } from "../utils/error.js";
import { parseUrl } from "../utils/urlParser.js";
import jwt from "jsonwebtoken";

export function validateUser(req, res) {
	const { token } = parseUrl(req);
	jwt.verify(token, process.env.JWT_SECRET, (error) => {
		if (error) throw new CustomError(error.message, 401);
	});
}
