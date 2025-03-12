import { PrismaClient } from "@prisma/client";
import { CustomError } from "../utils/error.js";
import { parseUrl } from "../utils/urlParser.js";
import { prisma } from "../utils/prismaProvider.js";

export const handleSignin = async (req, res) => {
	const params = parseUrl(req);
	try {
		await prisma.user.findFirstOrThrow({
			where: { username: params["username"], password: params["password"] },
		});
	} catch (error) {
		throw new CustomError("error getting data: " + error.toString(), 400);
	}
};
