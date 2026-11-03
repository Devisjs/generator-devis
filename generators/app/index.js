/* Copyright (c) 2016 Devis, MIT License */
import Generator from "yeoman-generator";

export const PLUGIN_VERSIONS = {
    "devis-mongo-client": "^2.0.1",
    "devis-pub_sub-redis": "^2.0.1",
    "devis_rabbitmq": "^2.1.0"
};

const TEMPLATES = [
    "README.md",
    "gateway.js",
    "services/hello/index.js",
    "services/hello/server.js",
    "test/hello.test.js"
];

export default class extends Generator {

    async prompting() {
        this.log("Welcome to the devis microservice framework generator!");
        this.props = await this.prompt([{
            type: "input",
            name: "name",
            message: "Project name",
            default: this.appname.toLowerCase().replace(/\s+/g, "-")
        }, {
            type: "checkbox",
            name: "plugins",
            message: "Plugins to add to the hello microservice",
            choices: Object.keys(PLUGIN_VERSIONS)
        }]);
    }

    writing() {
        const data = {
            name: this.props.name,
            plugins: this.props.plugins || [],
            pluginVersions: PLUGIN_VERSIONS
        };
        this.fs.copyTpl(this.templatePath("_package.json"), this.destinationPath("package.json"), data);
        this.fs.copy(this.templatePath("_gitignore"), this.destinationPath(".gitignore"));
        TEMPLATES.forEach((file) => {
            this.fs.copyTpl(this.templatePath(file), this.destinationPath(file), data);
        });
    }
}
