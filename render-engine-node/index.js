import http from "http";

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.end("hello");
});

server.listen(3000, () => {
	console.log("server up and running...");
});
