'use strict';
let mongoose = require('mongoose'),
    devis = require("devis");
devis.use('microservices/mongomodel/main');
let express = require("express"),
    app = express(),
    colors = require("colors/safe"),
    bodyParser = require('body-parser'),
    urlencodedParser = bodyParser.urlencoded({
        extended: false
    }),
    prefix = "/myapp",
    func = require("./app/route")({
        devis: devis
    });
app.use(express.static("views"));
app.use(require("body-parser").json());
app.get(prefix + '/:table/add', func.POST);
app.get(prefix, (req, res) => {
    res.render('index.ejs');
});
app.get(prefix + '/:table/:id', func.GET);
app.get(prefix + '/:table/', func.GET);
app.delete(prefix + '/:table/:id', func.DELETE);
app.delete(prefix + '/:table/', func.DELETE);
app.put(prefix + '/:table', urlencodedParser, func.PUT);

app.post(prefix + '/:table', urlencodedParser, func.POST);


app.listen({
    type: 'http',
    port: '8888',
    host: '127.0.0.1',
    protocol: 'http'
});
