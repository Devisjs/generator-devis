let fs = require('fs'),
    path = require('path');

function getDirectories(srcpath) {
	this.req = "devis=require('../../devis/devis');";

	fs.readdirSync(srcpath).filter((file) => {
		if (fs.statSync(path.join(srcpath, file)).isDirectory())
			req += "\ndevis.use('../microservices/" + file + "/main');";
	});

	fs.readFile('app/client.json', 'utf8', (err, data) => {
		obj = JSON.parse(data);
		for (let cl in obj) {
			this.req += "\ndevis.client({type: '" + obj[cl].type + "'\,port: '" + obj[cl].port + "'\,host: '" + obj[cl].host + "'\,protocol: '" + obj[cl].protocol + "'});";
		}
		//this.req+="\nmodule.exports=devis;";  
		this.req += "\ndevis.listen({host:'127.0.0.1',port:3030});";
		fs.writeFile("app/root.js", req, function (err) {
			if (err) {
				return console.log(err);
			}
			console.log("The file was saved!");
		});
	});
}

getDirectories('microservices');