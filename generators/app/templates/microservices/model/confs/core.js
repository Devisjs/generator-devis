'use strict';
let core=require('devis')
.use('../main')
score.client({type: 'unix_socket',port: '/tmp/authentification.sock'});
module.exports=core;
