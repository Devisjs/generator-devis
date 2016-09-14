var http = require("http");


function Link(...args)
{
    return "http://"+args[0].host+":"+args[0].port+""+args[0].path+"/"+args[1];
}
function GET(...args)
{
    let buffer="",
        link=args[0],
        toReplace=args[1],
        done=args[2],
        transmission=args[3],
        request=http.get(link,function(response)
       {
            response.on("data", function (chunk) {
                buffer += chunk;

                switch(toReplace instanceof Array){
                    case true:toReplace.forEach(v=> buffer=buffer.replace(v,""));
                    case false: buffer= buffer.replace(toReplace,"");
                }
            });

            response.on("end", function (err) {
                transmission.Response=JSON.parse(buffer);
                done(transmission);
                });
        })
}
module.exports={
    Link:Link,
    GET:GET
}
