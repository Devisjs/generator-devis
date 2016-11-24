/* Copyright (c) 2016 Devis, MIT License */
'use strict';

const mkpath = require('mkpath');
const fs = require('fs');
const colors = require("colors/safe");
const async = require('async');

let name = "microservice"; //default value

if (process.argv[2])
    name = process.argv[2];

let data = "";
let mainData = "'use strict';\nlet " + name[0] + "= require('./libs/functions');\nlet " + name + "=require('devis');\nmodule.exports =" + name + ";";

mkpath('microservices/' + name + '/confs', function(err) {
    if (err) throw err;
    mkpath('microservices/' + name + '/libs', function(err) {
        if (err) throw err;
        async.each(["/confs/core.js", "/confs/depencies.json", "/confs/interface.json", "/libs/functions.js", "/main.js"], function(file, callback) {
            if (file == "/main.js") data = mainData;
            fs.writeFile('./microservices/' + name + file, data, function(err) {
                if (err) console.log(err);
                callback();
            });
        }, function(err) {
            if (err) console.log('A file failed to process');
        });

        console.log(colors.green(name + ' scaffold created'));
        console.log('run ' + colors.grey('npm init') + ' and ' + colors.grey('npm install --save devis') + ' inside ' + name + ' folder');
    });
});
