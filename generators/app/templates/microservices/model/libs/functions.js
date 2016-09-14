var http = require("http");
function Conditions(conditions)
{
        var res="&$filter="+"\"";
        var cond=conditions,
            check=0;
            Object.keys(cond).forEach(function(key) {
                if(check!=0)
                res+=" AND ";
                if(cond[key][0]=="!")//"!" for example,just for test
                {
                    check=1;
                    cond[key]=cond[key].substring(1);
                    res+=key+""+cond[key][0]+"="+cond[key];
                }
                else
                {
                    check=1;
                    res+=key+"=="+cond[key];
                }
            });
            res+="\"";
            return res;
}
function Post(options,Data,done,type=null)//add or edit users
{
    let opt_Edit = {
                host: options.host,
                port: options.port,
                withCredentials:true,
                path: options.path+"/?"+options.update,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(JSON.stringify(Data))
                    }
                };
    if(options['link']) opt_Edit.path=options.link;
    if(options['cookie']) {
       [opt_Edit.headers.cookie,opt_Edit.headers['Content-Type'],opt_Edit.withCredentials,options['cookie']]=
                [options['cookie'],'application/json',true,null] ;

    }
    let post_req = http.request(opt_Edit, function(res) {
            res.on('data', function (chunk) {
                    let result="";
                    switch(type){
                        case 'login':
                            result=JSON.stringify(res.headers['set-cookie'][0]).split(";")[0].replace("\"","").split("=");
                            [options['login'],options['link']]=[null,null];
                            done({Response:JSON.parse(chunk),WASID:result[1]});

                        case 'group':
                            [options['group'],options['link']]=[null,null];
                            done(JSON.parse(chunk));

                        default:
                            result=JSON.parse(chunk);
                            result['__ERROR']?(State="ERROR",Response=result['__ERROR'][0]['message']):
                                          (State="Success",Response=result)
                            done({State,Response});
                    }
                });
            });
            post_req.write(JSON.stringify(Data));
            post_req.end();
}
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
    Conditions:Conditions,
    Post:Post,
    Link:Link,
    GET:GET
}
