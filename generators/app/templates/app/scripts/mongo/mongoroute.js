'use strict';
let devis;
let colors = require("colors/safe");

function DELETE(req, res) {
    devis.act({
        role: "mongo",
        action: "delete"
    }, {
        conditions: req.body,
        Schema: eval(req.params.table)
    }, function(err,result) {
        if(err) console.log(err);
        console.log(result);
        //res.render('index.ejs');
    });
}

function GET(req, res) {
    let ID={};
    if (req.params.id) ID={_id:req.params.id};
    devis.act({
        role: "mongo",
        action: "find"
    }, {
        conditions:ID,
        Schema: eval(req.params.table)
    }, function(pro) {
        if(err) console.log(err);
        console.log(pro);
        //res.render('index.ejs', {add data there });
    });
}

function PUT(req, res) {
    devis.act({
        role: "mongo",
        action: "update"
    }, {
        Schema: eval(req.params.table),
        conditions: req.params.id,
        update: req.body
    }, (err,res) => {
        if(err) console.log(err);
        console.log(res);
    });
}

function POST(req, res) {
    devis.act({
        role: "mongo",
        action: "insert"
    }, {
        Schema: eval(req.params.table),
        data: req.body
    }, (err,res) => {
        if(err) console.log(err);
        console.log(res);
    });
}

module.exports = function route(r) {
    devis = r.devis;
    return {
        GET: GET,
        POST: POST,
        PUT: PUT,
        DELETE: DELETE
    }
}
