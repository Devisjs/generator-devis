'use strict';

var fs = require('fs');
var name = "microservice";


function generateFunction(name) {
    return "function " + name + " (req, res) {\n};\n";
}

function createFile(name, writeData) {
    fs.writeFile(name, writeData, function(err) {
        if (err) throw err;
    });
}

function generateRoute(model) {
    let Route = "'use strict';\nlet devis;\n";
    Route += generateFunction("Post");
    Route += generateFunction("Put");
    Route += generateFunction("Get");
    Route += generateFunction("Delete");
    Route += "module.exports = function route(r) {\n        devis = r.devis;\n        return {\n            GET: GET,\n            POST: POST,\n            PUT: PUT,\n            DELETE: DELETE\n   } }";
    createFile('app/route/' + model + '.js', Route);
}

function generateController(model) {
    fs.readFile("app/scripts/jsFiles/angular.js", function(err, data) {
        if (err) throw err;
        let Str = "";
        Str += data;
        Str = Str.replace(/model/gi, model);
        createFile('public/controllers/' + model + '.js', Str);
    });
}
module.exports = {
    generateController: generateController,
    generateRoute: generateRoute

}
