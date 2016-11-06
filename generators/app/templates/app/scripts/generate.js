'use strict';

var fs = require('fs');



function generateFunction(name) {
    return "function " + name + " (req, res) {\n};\n";
}

function createFile(name, writeData) {
    fs.writeFile(name, writeData, function (err) {
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
function generateDataTag(Tag, data) {
    let result = "";
    for (let k in data) {
        if (k != "updated_at")
            result += Tag.replace('tag', k) + "\n";
    }
    return result;
}

function htmlIndexGenerate(model, dataModel) {
    fs.readFile("app/scripts/default/index.html", function (err, data) {
        if (err) throw err;
        let Str = "";
        Str += data;
        Str = Str.replace(/model/gi, model)
            .replace('<th>tag</th>', generateDataTag('<th>tag</th>', dataModel))
            .replace('<td><input class="form-control" ng-' + model + '="' + model + '.tag" /></td>', generateDataTag('<td><input class="form-control" ng-model="' + model + '.tag" /></td>', dataModel))
            .replace('<td>{{' + model + '.tag}}</td>', generateDataTag('<td>{{' + model + '.tag}}</td>', dataModel))
        createFile('public/' + model + '/index.html', Str);
    });
}
function generateController(model) {
    fs.readFile("app/scripts/default/angular.js", function (err, data) {
        if (err) throw err;
        let Str = "";
        Str += data;
        Str = Str.replace(/model/gi, model);
        createFile('public/controllers/' + model + '.js', Str);
    });
}
module.exports = {
    htmlIndexGenerate: htmlIndexGenerate,
    generateController: generateController,
    generateRoute: generateRoute
}