'use strict';

function insert(args, done) {
    let res;
    let newData = new(eval(args['Schema']))(args.data);
    newData.save(function(err) {
        if (err)
            res = err;
        else
            res = newData;
        done(res);
    });
}

function find(args, done) {
    let res;
    args['Schema'].find(args.conditions, (err, result) => {
        if (err) res = err;
        else res = result;
        done(res);
    });
}

function update(args, done) {
    let res;
    let callback = (err, result) => {
        if (err) res = err;
        else res = result;
        done(res);
    };
    // Model.update(conditions, update, [options], [callback])
    // update `multi`ple tasks from complete false to true
    //Model.findByIdAndUpdate(id, [update], [options], [callback])
    //Model.findOneAndUpdate([conditions], [update], [options], [callback])
    if (!args.options) args.options = {};
    if (args.multi === true)
        args['Schema'].update(args.conditions, args.update, args.options, callback);


    else
    if (args.id)
        args['Schema'].findByIdAndUpdate(id, args.update, args.options, callback);
    else
        args['Schema'].findOneAndUpdate(args.conditions, args.update, args.options, callback);
}

function delet(args, done) {
    let res;
    let callback = (err, result) => {
        if (err) res = err;
        else res = result;
        done(res);
    };
    // Model.update(conditions, update, [options], [callback])
    // update `multi`ple tasks from complete false to true
    //Model.findByIdAndUpdate(id, [update], [options], [callback])
    //Model.findOneAndUpdate([conditions], [update], [options], [callback])
    if (!args.options) args.options = {};
    if (args.multi === true)
        args['Schema'].remove(args.conditions,callback);


    else
    if (args.id)
        args['Schema'].findByIdAndRemove(id, args.options, callback);
    else
        args['Schema'].findOneAndRemove(args.conditions,args.options, callback);
}
module.exports = {
    insert: insert,
    delet: delet,
    update: update,
    find: find
}
