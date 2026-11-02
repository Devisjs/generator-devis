"use strict";
const test = require("node:test");
const assert = require("node:assert");
const { spawn } = require("node:child_process");
const path = require("node:path");

const env = Object.assign({}, process.env, { SERVICE_PORT: "3131", PORT: "8181" });
const children = [];

function start(file, readyText) {
    return new Promise((resolve, reject) => {
        const child = spawn(process.execPath, [path.join(__dirname, "..", file)], { env });
        children.push(child);
        child.stdout.on("data", (data) => {
            if (data.toString().includes(readyText)) resolve();
        });
        child.on("exit", (code) => reject(new Error(file + " exited with code " + code)));
    });
}

test.before(async () => {
    await start("services/hello/server.js", "server launched");
    await start("gateway.js", "gateway listening");
});

test.after(() => children.forEach((child) => child.kill()));

// The gateway must reach the hello microservice over TCP, not answer by itself.
test("GET /hello is answered by the hello microservice", async () => {
    const res = await fetch("http://127.0.0.1:8181/hello?name=devis");
    assert.strictEqual(res.status, 200);
    assert.deepStrictEqual(await res.json(), { message: "Hello devis" });
});
