"use strict";
const devis = require("./index");

devis.listen({
    host: process.env.SERVICE_HOST || "127.0.0.1",
    port: Number(process.env.SERVICE_PORT || 3030)
});

process.on("SIGTERM", () => devis.close(() => process.exit(0)));
