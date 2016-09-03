var devis;
var colors = require("colors/safe");
function DELETE(req, res) {
    devis.act({ clientId: 1, role: "model", action: "DELETE", ID: req.params.id, table: req.params.table }, function (err, result) {
        error_test(result);
        //res.render('index.ejs');
    });
}

function GET(req, res) {
    req.params.id ? ID = req.params.id : ID = 1000;
    var cond = { ID };

    devis.act({ clientId: 1, role: "model", action: "GET", conditions: cond, table: req.params.table }, function (err, pro) {
        //res.render('index.ejs', { __STAMP: pro['Response']['__STAMP'], __KEY: pro['Response']['__KEY'], firstName: pro['Response']['firstName'] });
    });
}

function PUT(req, res) {
    Post_Put("PUT", req, res);
}

function POST(req, res) {
    Post_Put("POST", req, res);
}

function Post_Put(action, req, res) {
    var Data = { __ENTITIES: [req.body] };//without __KEY and __STAMP!!
    let data=req.body;
    console.log(data);
    devis.act({ clientId: 1, role: "model", action: action, Add: JSON.stringify(data), table: req.params.table }, function (err, result) {
        console.log(result);
        error_test(result);
    });
}
function error_test(result) {
    var color, screen;
    result['Response'] == "ERROR" ? (console.log(colors.red(result['Response']))) :
        (console.log(colors.green("Success")));
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