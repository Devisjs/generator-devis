'use strict';
var mkpath = require('mkpath');
var fs = require('fs');
var path = require('path');
var generate = require("./generate");
function checkDirectory(data, callback) {
    fs.stat(data, function (err, stats) {
        if (err && err.errno === -2) {
            console.log(err);
            callback(0);
        } else {
            callback(1)
        }
    });
}

function createFile(name, writeData) {
    fs.writeFile(name, writeData, function (err) {
        if (err) throw err;
    });
}

function createModel(model, data) {
    try {
        data = JSON.stringify(data);
        data = data.replace("\"Date\"", "Date").replace("\"Date.now\"", "Date.now");

        let writeData = "'use strict'\nlet mongoose = require('mongoose');";
        writeData += "\nlet Schema = new mongoose.Schema(" + data + ");";
        writeData += "\nmodule.exports = mongoose.model(\"" + model + "\", Schema);";

        createFile('app/database/mongo/models/' + model + '.js', writeData);
        mkpath('public/' + process.argv[3], function (err) {
            if (err) throw err;
            createFile('public/' + process.argv[3] + '/index.html', "");
            generate.generateController(process.argv[3]);
            generate.generateRoute(process.argv[3]);
        });
    }
    catch (e) {
        console.log(e);
    }
}


if (!process.argv[3] && process.argv[2] != "generate") {
    mkpath('app/database/' + process.argv[2] + '/models', function (err) {
        if (err) throw err;
    });

} else if (process.argv[2] == "generate") {
    let req = "'use strict';\n";
    let data = [];
    fs.readdirSync("app/route").filter((file) => {
        if (!fs.statSync(path.join("app/route", file)).isDirectory()) {
            req += "const " + path.basename(file, ".js") + " = require('./app/route/" + file + "')({devis: devis});\n";
            data.push(path.basename(file, ".js"));
        }

    });
    req += "const data=" + JSON.stringify(data) + ";\n";

    fs.writeFile('index.js', req, "UTF-8", "a+");
    fs.readFile('app/scripts/jsFiles/indexGenerator.js', function read(err, data) {
        fs.appendFile('./index.js', data, "UTF-8", "a+");
    });

} else {
    fs.readdirSync("app/database").filter((file) => {
        if (fs.statSync(path.join("app/database", file)).isDirectory()) {
            if (file == "mongo") {
                fs.readFile('app/database/data.json', function read(err, data) {
                    if (err) throw err;

                    let content = "";
                    content += data;
                    content = JSON.parse(content)[process.argv[3]];
                    createModel(process.argv[3], content);
                });

            }
            if (file == "mysql") {
                //will be implemented soon...
            }

        }
    });
}
