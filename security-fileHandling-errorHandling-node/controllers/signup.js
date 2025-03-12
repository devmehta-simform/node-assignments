import { PrismaClient } from "@prisma/client";
import { COMMON_MESSAGES, CustomError } from "../utils/error.js";

const prisma = new PrismaClient();

export const handleSignup = async (req, res) => {
	const params = parseUrl(req);
	try {
		await prisma.user.create({
			data: { username: params["username"], password: params["password"] },
		});
	} catch (error) {
		throw new CustomError(
			"error storing data: " + error.toString(),
			COMMON_MESSAGES.INTERNAL_SERVER_ERROR
		);
	}
};
function parseUrl(req) {
	const queryParams = req.url.split(/[?&=]/);
	queryParams.shift();
	const params = {};
	for (let i = 0; i < queryParams.length; i += 2) {
		params[queryParams[i]] = queryParams[i + 1];
	}
	return params;
}
