'use strict';
var os=require('os');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var f=require('fs');
var res="",same="";
module.exports = yeoman.Base.extend({

  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to devis\n' + chalk.red('microservice framework') + ' generator!'
    ));

    var prompts = [{
    type: 'input',
    name: 'name',
    message: 'OS '+os.platform()+'? Y/n',
      default: 'Y'
    }];
	same=this.appname;
    return this.prompt(prompts).then(function (props) {
	  this.props = props;
      res=props.name;
       if(res=='n'||res=='N')
	  {  
		this.log.error('System error');
		process.exit(1);
	}
    }.bind(this));
  },
  
  writing: function () {
  	this.directory('.', '.');
		
  },

  install: function () {
    this.installDependencies();
  }
});
