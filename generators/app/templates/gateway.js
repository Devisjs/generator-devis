"use strict";
const http = require("node:http");
const devis = require("devis");

const HELLO = "hello";

devis.setName("gateway").connect({
    host: process.env.SERVICE_HOST || "127.0.0.1",
    port: Number(process.env.SERVICE_PORT || 3030),
    id: HELLO,
    timeout: 5000
});

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");
    if (url.pathname !== "/hello") {
        res.writeHead(404).end();
        return;
    }
    try {
        const message = await devis.call({ role: "hello", cmd: "greet" }, { name: url.searchParams.get("name") });
        res.writeHead(200, { "content-type": "application/json" }).end(JSON.stringify({ message }));
    } catch (err) {
        res.writeHead(502).end(err.message);
    }
});

server.listen(Number(process.env.PORT || 8080), () => {
    console.log("gateway listening on port " + server.address().port);
});

process.on("SIGTERM", () => {
    server.close();
    devis.close(() => process.exit(0));
});
