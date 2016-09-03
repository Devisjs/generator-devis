//Define variables
let app = require("express")(),
    colors = require("colors/safe"),
    data = require('./app/wakanda_config');

let bodyParser = require('body-parser'),
    urlencodedParser = bodyParser.urlencoded({ extended: false }),
    devis = require('../devis/devis'),
    prefix = "/wakandas";

devis.client({ host: '127.0.0.1', port: 3030, id: 1 }).setName("index");


func = require("./app/route")({ devis: devis });

//Initialisation of our model
devis.act({ clientId: 1, role: "model", action: "Initialise", options: data.options[0] }, ()=>{});

let login = [data.options[0]['login'], data.options[0]['password']];
let ID = ["Test"];
devis.act({ clientId: 1, role: "auth", action: "login", Data: login, options: data.options[0] }, function (err, sessionID) {
    console.log(colors.green(JSON.stringify(sessionID)));

});

app.use(require("body-parser").json());

app.get(prefix + '/:table/:id', func.GET);

app.delete(prefix + '/:table/:id', func.DELETE);

app.put(prefix + '/:table', urlencodedParser, func.PUT);

app.post(prefix + '/:table', urlencodedParser, func.POST);


app.listen({
    type: 'http',
    port: '8888',
    host: '127.0.0.1',
    protocol: 'http'
});


