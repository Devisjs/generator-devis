'use strict';
let mongo = require('./libs/functions');
let mongomodel = require('devis');

mongomodel.add({
    role: "mongo",
    action: "insert"
}, mongo.insert);

mongomodel.add({
    role: "mongo",
    action: "find"
}, mongo.find);

mongomodel.add({
    role: "mongo",
    action: "update"
}, mongo.update);

mongomodel.add({
    role: "mongo",
    action: "delete"
}, mongo.delet);

module.exports = mongomodel;
