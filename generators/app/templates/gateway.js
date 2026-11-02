"use strict";
const http = require("node:http");
const devis = require("devis");

const HELLO = 0;

devis.setName("gateway").connect({
    host: process.env.SERVICE_HOST || "127.0.0.1",
    port: Number(process.env.SERVICE_PORT || 3030),
    id: HELLO
});

const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");
    if (url.pathname !== "/hello") {
        res.writeHead(404).end();
        return;
    }
    // devis removes clientId from the pattern, so build a new one per call.
    devis.call({ clientId: HELLO, role: "hello", cmd: "greet" }, { name: url.searchParams.get("name") }, (err, result) => {
        if (err) {
            res.writeHead(500).end(String(err));
            return;
        }
        res.writeHead(200, { "content-type": "application/json" }).end(JSON.stringify({ message: result }));
    });
});

server.listen(Number(process.env.PORT || 8080), () => {
    console.log("gateway listening on port " + server.address().port);
});
