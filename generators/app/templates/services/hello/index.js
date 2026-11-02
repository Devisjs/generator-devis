"use strict";
const devis = require("devis");

devis.setName("hello")<% plugins.forEach((plugin) => { %>
    .plug("<%= plugin %>")<% }) %>;

devis.push({ role: "hello", cmd: "greet" }, (args, done) => {
    done(null, "Hello " + (args.name || "world"));
});

module.exports = devis;
