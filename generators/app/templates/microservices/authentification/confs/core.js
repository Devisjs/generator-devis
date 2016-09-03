core=require('../../../../devis/devis')()
.use('../main')
.use('../../transport/main')
.listen({type:'unix_socket',path:'/tmp/authentification.sock'});
core.client({type: 'unix_socket',port: '/tmp/model.sock'});
module.exports=core;