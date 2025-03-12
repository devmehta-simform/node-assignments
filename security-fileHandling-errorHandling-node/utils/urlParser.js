export function parseUrl(req) {
	const queryParams = req.url.split(/[?&=]/);
	queryParams.shift();
	const params = {};
	for (let i = 0; i < queryParams.length; i += 2) {
		params[queryParams[i]] = queryParams[i + 1];
	}
	return params;
}
