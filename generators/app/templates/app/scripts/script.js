"use strict";
let fs = require('fs'),
    path = require('path');
let req="";
function getDirectories(srcpath) {
	req = "'use strict';\nlet devis=require('devis');";

	fs.readdirSync(srcpath).filter((file) => {
		if (fs.statSync(path.join(srcpath, file)).isDirectory())
			req += "\ndevis.use('../microservices/" + file + "/main');";
	});

	fs.readFile('app/client.json', 'utf8', (err, data) => {
		let obj = JSON.parse(data);
		for (let cl in obj) {
			req += "\ndevis.client({type: '" + obj[cl].type + "'\,port: '" + obj[cl].port + "'\,host: '" + obj[cl].host + "'\,protocol: '" + obj[cl].protocol + "'});";
		}
		//this.req+="\nmodule.exports=devis;";
		req += "\ndevis.listen({host:'127.0.0.1',port:3030});";
		fs.writeFile("app/root.js", req, function (err) {
			if (err) {
				return console.log(err);
			}
			console.log("The file was saved!");
		});
	});
}

getDirectories('microservices');
