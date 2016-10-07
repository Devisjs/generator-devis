'use strict';
var mkpath = require('mkpath');
var fs = require('fs');
var path = require('path');

function checkDirectory(data, callback) {
    fs.stat(data, function(err, stats) {
        if (err && err.errno === -2) {
            console.log(err);
            callback(0);
        } else {
            callback(1)
        }
    });
}

function createFile(name, writeData) {
    fs.writeFile(name, writeData, function(err) {
        if (err) throw err;
    });
}

function createMongoModel(model, data) {
    data = JSON.stringify(data);
    data = data.replace("\"Date\"", "Date");
    data = data.replace("\"Date.now\"", "Date.now");
    let writeData = "'use strict'\nlet mongoose = require('mongoose');";
    writeData += "\nlet Schema = new mongoose.Schema(" + data + ");";
    writeData += "\nmodule.exports = mongoose.model(\"" + model + "\", Schema);";

    createFile('app/database/mongo/models/' + model + '.js', writeData);
    mkpath('views/' + process.argv[3], function(err) {
        if (err) throw err;
        createFile('views/' + process.argv[3] + '/index.ejs', "");
        createFile('views/' + process.argv[3] + '/update.ejs', "");
        createFile('views/' + process.argv[3] + '/add.ejs', "");
    });
}


if (!process.argv[3]) {
    mkpath('app/database/' + process.argv[2] + '/models', function(err) {
        if (err) throw err;
    });

} else if (process.argv[2] == "generate") {
    fs.createReadStream('app/scripts/mongo/mongoindex.js').pipe(fs.createWriteStream('index.js'));
    let req = "'use strict';";
    req += "\nlet mongoose = require('mongoose');";
    req += "\nmongoose.connect('mongodb://localhost/" + process.argv[3] + "');";
    fs.readdirSync("app/database/mongo/models").filter((file) => {
        if (!fs.statSync(path.join("app/database/mongo/models", file)).isDirectory())
            req += "\nlet " + path.basename(file, ".js") + " = require('./database/mongo/models/" + file + "');";
    });
    fs.writeFile('app/route.js', req, "UTF-8", "a+");
    fs.readFile('app/scripts/mongo/mongoroute.js', function read(err, data) {
        fs.appendFile('app/route.js', data, "UTF-8", "a+");
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
                    createMongoModel(process.argv[3], content);
                });

            }
            if (file == "mysql") {
                //will be implemented soon...
            }

        }
    });
}
