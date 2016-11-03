const session = require('express-session'),
    bodyParser = require('body-parser'),
    devis = require("devis"),
    data = [],
    express = require("express"),
    app = express(),
    urlencodedParser = bodyParser.urlencoded({
        extended: false
    }),
    prefix = "/myapp";
app.use(require("body-parser").json());
app.use(express.static("public"));

for (let k in data) {
    app.delete(prefix + '/' + data[k] + '/:id', eval(data[k]).DELETE);
    app.get(prefix + '/' + data[k] + '/', auth('normal'), eval(data[k]).GET);
    app.get(prefix + '/' + data[k] + '/:id', auth('normal'), eval(data[k]).GET);
    app.post(prefix + '/' + data[k] + '/', urlencodedParser, eval(data[k]).POST);
    app.put(prefix + '/' + data[k], urlencodedParser, eval(data[k]).PUT);
}

app.listen({
    type: 'http',
    port: '8888',
    host: '127.0.0.1',
    protocol: 'http'
});
