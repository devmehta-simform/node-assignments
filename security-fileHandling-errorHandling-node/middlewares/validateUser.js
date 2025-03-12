import { COMMON_MESSAGES, CustomError } from "../utils/error.js";
import { parseUrl } from "../utils/urlParser.js";
import jwt from "jsonwebtoken";
import { parseCookies } from "../utils/cookieParser.js";
export function validateUser(req, res) {
	const cookies = parseCookies(req.headers.cookie);
	if (!cookies || !cookies["token"])
		throw new CustomError(COMMON_MESSAGES.UNAUTHORIZED, 401);
	jwt.verify(cookies["token"], process.env.JWT_SECRET, (error) => {
		if (error) throw new CustomError(error.message, 401);
	});
}
