core=require('seneca')()
.use('../main')
.use('../../transport/main')
.listen({type:'unix_socket',path:'/tmp/model.sock'});
core.client({type: 'unix_socket',port: '/tmp/authentification.sock'});
module.exports=core;