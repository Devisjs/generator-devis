<img src="http://gdurl.com/PeQp" width="350"/>

# Devis generator
#
                               _-----_     ╭──────────────────────────╮
                              |       |    │     Welcome to devis     │
                              |--(o)--|    │  microservice framework  │
                             `---------´   │        generator!        │
                              ( _´U`_ )    ╰──────────────────────────╯
                              /___A___\   /
                               |  ~  |     
                             __'.___.'__   
                           ´   `  |° ´ Y ` 

#

## Getting Started


### What is Yeoman?
[![](https://raw.githubusercontent.com/yeoman/media/master/optimized/yeoman-masthead.png)](http://yeoman.io)


Yeoman helps you to kickstart new projects, prescribing best practices and tools to help you stay productive.

To do so, Yeoman provide a [generator ecosystem](http://yeoman.io/generators/). A generator is basically a plugin that can be run with the `yo` command to scaffold complete projects or useful parts.


## Usage
**if you upload the project**

Install both yeoman and the generator:
```bash
npm install -g yo generator-generator
```

Setup a generator project:
```bash
yo generator
```

Link the generator in the global node modules:
```bash
npm link
```

Navigate to a folder you would love to scaffold a new project and run:
```bash
yo devis
```
### Using the project
Once installed, you can start creating microservices by using **devis framework**. You can rely on both microservices that already exist in the project: model and authentification. 

After, you should add your microservices to the file *root.js*, located in the folder *app*. Fortunately there already a script that will perform this task in your place , you just have to run the command :

```bash
npm start
```

If you just wanna test both existing microservices, you should install [ wakanda ] ( https://wakanda.github.io ), add one or more tables , a use, change login and password on ```app/wakanda_config.js``` and launch

```bash
npm start
node index.js
```

The script will generate automatically the file *root.js*: use  both microservices and launch the server.
By running the index file you will consume the server and log in **wakanda**.

### Log file

If you want to know handles that a Microservice offers, like *model* , you just have to write the following command:

```bash
npm run-script log microservices/model/main
```
If this microservice are distant, for example
```javascript
var devis=require("devis");

devis.add({
  action: 'game',
  cmd:'play'
}, function(args, done) {

  done({ result: 'play' });
});
devis.add({
  action: 'game',
  cmd:'pause'
}, function(args, done) {

  done({ result: 'pause' });
});
devis.listen({
  host:'127.0.0.1',
  port:3030
})
```
You should run
```bash
npm run-script log connect port : '3030' , host : "127.0.0.1" 
```
**Don't forget space between each argument!**

A file will be created under the name **devis-log.txt** or you will find all the information regarding this Microservice.
