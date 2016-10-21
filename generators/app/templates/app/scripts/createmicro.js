'use strict';
var mkpath = require('mkpath');
var fs = require('fs');
var name = "microservice";
var colors = require("colors/safe");

if (process.argv[2])
    name = process.argv[2];

var main = "'use strict';\nlet " + name[0] + "= require('./libs/functions');\nlet " + name + "=require('devis');\nmodule.exports =" + name + ";";
mkpath('microservices/'+name + '/confs', function(err) {
    if (err) throw err;
    fs.writeFile('microservices/'+name + "/confs/core.js", "", function(err) {
        if (err) throw err;
    });
    fs.writeFile('microservices/'+name + "/confs/depencies.json", "", function(err) {
        if (err) throw err;
    });
    fs.writeFile('microservices/'+name + "/confs/interface.json", "", function(err) {
        if (err) throw err;
    });
});

mkpath('microservices/'+name+ '/libs', function(err) {
    if (err) throw err;
    fs.writeFile('microservices/'+name + "/libs/functions.js", "", function(err) {
        if (err) throw err;
    });
    fs.writeFile('microservices/'+name + "/main.js", main, function(err) {
        if (err) throw err;
    });
    console.log(colors.green(name + ' scaffold created'));
    console.log('run '+colors.grey('npm init')+' and '+ colors.grey('npm install --save devis')+ ' inside ' + name + ' folder');
});
