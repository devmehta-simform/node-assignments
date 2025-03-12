export class CustomError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
	}
}

export const COMMON_MESSAGES = {
	SUCCESS: "success",
	NOT_FOUND: "not found",
	ROUTE_NOT_FOUND: "route not found",
	INTERNAL_SERVER_ERROR: "internal server error",
};
