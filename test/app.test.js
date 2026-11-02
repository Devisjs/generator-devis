import test from "node:test";
import assert from "node:assert";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import helpers from "yeoman-test";

const generator = path.join(path.dirname(fileURLToPath(import.meta.url)), "../generators/app");

function run(answers) {
    return helpers.run(generator).withAnswers(answers).withOptions({ skipInstall: true });
}

test("generates a gateway and a hello microservice on devis 3", async () => {
    const result = await run({ name: "shop", plugins: [] });
    result.assertFile(["package.json", ".gitignore", "README.md", "gateway.js", "services/hello/index.js", "services/hello/server.js", "test/hello.test.js"]);
    result.assertJsonFileContent("package.json", { name: "shop", dependencies: { devis: "^3.0.0" } });
    result.assertNoFileContent("services/hello/index.js", ".plug(");
});

// A selected plugin is useless unless it is both installed and plugged into the service.
test("selected plugins are added to dependencies and plugged", async () => {
    const result = await run({ name: "shop", plugins: ["devis-mongo-client", "devis_rabbitmq"] });
    result.assertJsonFileContent("package.json", { dependencies: { "devis-mongo-client": "^2.0.0", "devis_rabbitmq": "^2.0.0" } });
    result.assertFileContent("services/hello/index.js", ".plug(\"devis-mongo-client\")");
    result.assertFileContent("services/hello/index.js", ".plug(\"devis_rabbitmq\")");
    result.assertNoFileContent("services/hello/index.js", "devis-pub_sub-redis");
});

test("the generated project installs and passes its own tests", { skip: !process.env.E2E && "set E2E=1 to run" }, async () => {
    const result = await run({ name: "shop", plugins: ["devis-mongo-client"] });
    execFileSync("npm", ["install", "--no-audit", "--no-fund"], { cwd: result.cwd, stdio: "inherit" });
    execFileSync("npm", ["test"], { cwd: result.cwd, stdio: "inherit" });
});
