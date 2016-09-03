const querystring = require('querystring');   
   	http = require("http"),
   	fs=require("fs"),
   	q=require("./libs/functions");
const authentification=require('../../../devis/devis');

let options,buffer;
    authentification.add({role:"auth",action:"login"},(args,done)=>
    {
        options=args.options;
        authentification.act({role:"model",action:"POST",link:q.Link(options,options.loginLink),opt:"login",Add:args.Data},function(err,pro){
           done(null,pro);
        });
    })
    authentification.add({role:"auth",action:"currentUser"},(args,done)=>
    {
       let transmission={Response:""};
       q.GET(q.Link(options,options.currentUser),"undefined",done,transmission);
    })
    authentification.add({role:"auth",action:"currentUserBelongsTo"},(args,done)=>
    {
       authentification.act({role:"model",action:"POST",link:q.Link(options,options.belongsTo),opt:"group",Add:args.ID},function(err,pro){
           done(null,pro);
        });
    })
    authentification.add({role:"auth",action:"logout"},(args,done)=>
    {
        let transmission={Response:""};
        q.GET(q.Link(options,options.logout),"undefined",done,transmission);
    })




module.exports=authentification;
