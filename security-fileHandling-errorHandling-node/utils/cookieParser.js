export const parseCookies = (cookieHeader) => {
	const cookies = {};
	if (cookieHeader) {
		cookieHeader.split(";").forEach((cookie) => {
			const [key, value] = cookie.split("=").map((str) => str.trim());
			cookies[key] = value;
		});
	}
	return cookies;
};
