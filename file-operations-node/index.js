import http from "http";
import fs from "fs";
import path from "path";
import multer from "multer";

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.end("hello world");
});

server.listen(3000, () => {
	console.log("server is up and running...");
});
