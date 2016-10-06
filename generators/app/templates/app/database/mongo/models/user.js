'use strict';
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myapp');
let Schema = new mongoose.Schema({
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
        "type": Date,
        "default": Date.now
    }
});
module.exports = mongoose.model("user", Schema);
