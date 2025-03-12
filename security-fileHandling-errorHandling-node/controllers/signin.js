import { CustomError } from "../utils/error.js";
import { parseUrl } from "../utils/urlParser.js";
import { prisma } from "../utils/prismaProvider.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({});

export const handleSignin = async (req, res) => {
	const params = parseUrl(req);
	try {
		await prisma.user.findFirstOrThrow({
			where: { username: params["username"], password: params["password"] },
		});
		return jwt.sign({ username: params["username"] }, process.env.JWT_SECRET, {
			expiresIn: "30m",
		});
	} catch (error) {
		throw new CustomError("error getting data: " + error.toString(), 400);
	}
};
