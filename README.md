<img src="http://gdurl.com/PeQp" width="350"/>
<p align="center">
  <a href="https://www.npmjs.com/package/generator-devis"><img src="https://img.shields.io/npm/dt/generator-devis.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/generator-devis"><img src="https://img.shields.io/npm/v/generator-devis.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/generator-devis"><img src="https://img.shields.io/npm/l/generator-devis.svg" alt="License"></a>
  <br>

</p>
check out this video to see the demo https://www.youtube.com/watch?v=3-a5ysx0lrI
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

**Remember** that Devis is based on devispattern that is an addon written in c ++.

It's necessary, before using Devis to install:
* python v2.7, and make a c ++ compiler like gcc under **unix / linux-gnu** and install more xcode with command line tools if you are under **mac os**

* on **Windows**: Install all the required tools and configurations using Microsoft's windows-build-tools using ```npm install --global --production windows-build-tools``` from an elevated PowerShell or CMD.exe (run as Administrator).

**Installation**
```bash
npm install -g yo generator-devis
```

**Or, if you upload the project**

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
### What is Generator-devis?

we will define each part of the generator as a tree

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|**.app**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-->**.script**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|---->**.script.js**
* generate local depencies on different microservices and run server you can customise the code if you want for example use different microservice remotely not localy.<br>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|---->You can add other scripts there <br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-->**.root.js**
* it is here where will be added the different microservices locally or as a client<br><br>
|-->**.route.js**
* This is an optional file that you can delete if you want or take it as example to create your own. it's in this module where will be implemented and evaluated the different functions that you will use in the index file.<br>
By default this module contains the functions put, get, post and delete to express routing framework, as i said it's just an example.<br><br>
|-->**.wakanda_config**
* it's here where you will find the necessary configuration to connect wakanda via api rest, you should change the login and password and you can add different data tables to use.
Of course you can delete this file or take it as example to connect another interface, or database, MongoDB for example by implementing the adequate Microservice.<br><br>
|-->**.client.json**
* If you intended to consume distance microservices you should add here the necessary information For each Microservice and the script that i described previously will handle these microservices by adding them to the root file.<br>
|**.microservices**<br>
* You will add there your different microservices<br>
|-->**.Micro1**<br>
|---->**.main.js** <br>
* It's the core of your Microservice where you will define the different properties, but for clarity, you will only define the properties here, the callback functions will be reported elsewhere in the libs folder.<br><br>
|---->**.libs** <br>
* Example:

If your Microservice is model called  and contains properties: GET and Post then your main.js will be like that:
```js
let model = require("devis");
let model_f = require("./libs/functions");

model.add({
        role: "model",
        action: "GET"
    },
    model_f.GET);

model.add({
    role: "model",
    action: "POST"
}, model_f.POST);
module.exports = model;
```
And the functions file will be something like that:
```js
function POST(args, done) {
   //do something
        done(finalresult);
    }
function GET(args, done) {
   //do something
        done(finalresult);
    }
module.exports={
	    POST:POST,
	    GET:GET
	}
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|---->**.confs** <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|------>**.core.js** <br>
* If you want your Microservice to be used remotly too you should do like the two available microservices by adding the dependencies in the file depencies if you have.<br><br>
|**.index**<br>
* it is here or you'll exploit your different microservices.

### Using the project
Once installed, you can start creating microservices by using **devis framework**. You can rely on both microservices that already exist in the project: model and authentification.

After, you should add your microservices to the file *root.js*, located in the folder *app*. Fortunately there already a script that will perform this task in your place , you just have to run the command :

```bash
npm install
npm start
```

If you just wanna test both existing microservices, you should install [ wakanda ] ( https://wakanda.github.io ), add one or more tables , a use, change login and password on ```app/wakanda_config.js``` and launch

```bash
npm install
npm start
node index.js
```

The script will generate automatically the file *root.js*: use  both microservices and launch the server.
By running the index file you will consume the server and log in **wakanda**.


### Log file

If you want to know handles that a Microservice offers, like *model* , you just have to write the following command:

```bash
devis log microservices/model/main
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
devis log connect port : '3030' , host : "127.0.0.1"
```
**Don't forget space between each argument!**

A file will be created under the name **devis-log.txt** or you will find all the information regarding this Microservice.

###Generate microservice scaffold
If you want to generate a scaffold of Microservice you should run the following command:

```bash
devis createMicro microservice_name
```

##Use MongoDB
If you want use mongodb in your application you have just to write some simple commands:
For example, you wanna create 2 schemas *users and posts*
we suppose that the database name is "myapp"
First you should implement the `data.json :app/database/data.json`:
```json
{
    "user": {
        "firstname": {
            "type": "String",
            "unique": "true",
            "required": "true"
        },
        "lastname": {
            "type": "String",
            "unique": true,
            "required": true
        },
        "updated_at": {
            "type": "Date",
            "default": "Date.now"
        }
    },
    "poste":{
      "name":"String",
      "text":"String",
      "user_id":"String",
      "updated_at": {
          "type": "Date",
          "default": "Date.now"
      }
    }
}
```
After you have to run this commands:
```bash
devis db mongo
devis db myapp user
devis db myapp poste
devis db configure
```
After that, files ``index.js`` and ``app/route.js`` will be implemented by using mongodb micorservice and user,poste schema. Inside views folder you will see 2 folders `user` and `poste` with ``"ejs" files`` to implement for edit, add and index for each schema.
Implement methods inside app/route.js file and that's it! you have a complete and powerfull application with minimum effort and in minimum time!  
