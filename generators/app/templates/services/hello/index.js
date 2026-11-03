"use strict";
const devis = require("devis");

devis.setName("hello")<% plugins.forEach((plugin) => { %>
    .plug("<%= plugin %>")<% }) %>;

devis.push({ role: "hello", cmd: "greet" }, async ({ name }) => "Hello " + (name || "world"));

module.exports = devis;
