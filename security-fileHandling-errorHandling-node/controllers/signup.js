import { PrismaClient } from "@prisma/client";
import { CustomError } from "../utils/error.js";
import { parseUrl } from "../utils/urlParser.js";
import { prisma } from "../utils/prismaProvider.js";

export const handleSignup = async (req, res) => {
	const params = parseUrl(req);
	try {
		await prisma.user.create({
			data: { username: params["username"], password: params["password"] },
		});
	} catch (error) {
		throw new CustomError("error storing data: " + error.toString(), 400);
	}
};
