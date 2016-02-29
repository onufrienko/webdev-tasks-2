'use strict';

const mongoClient = require('mongodb').MongoClient;

var multivarka = {
    server: function (url) {
        this.url = url;
        return this;
    },
    collection: function (name) {
        this.colName = name;
        return this;
    },
    not: function () {
        this.isNot = true;
        return this;
    },
    where: function (field) {
        this.field = field;
        return this;
    },
    equal: function (value) {
        this.obj = getObj(this.field, value, 'equal', this.isNot);
        return this;
    },
    lessThan: function (value) {
        this.obj = getObj(this.field, value, 'less', this.isNot);
        return this;
    },
    greateThan: function (value) {
        this.obj = getObj(this.field, value, 'greate', this.isNot);
        return this;
    },
    include: function (value) {
        this.obj = getObj(this.field, value, 'include', this.isNot);
        return this;
    },
    find: function (cb) {
        var name = this.colName;
        var limit = this.obj;
        mongoClient.connect(this.url, function (err, db) {
            if (err) {
                console.log('ERROR ' + err);
            } else {
                db.collection(name).find(limit).toArray(function (err, result) {
                    cb(err, result);
                    db.close();
                });
            }
        });
    },
    insert: function (record, cb) {
        var name = this.colName;
        mongoClient.connect(this.url, function (err, db) {
            if (err) {
                console.log('ERROR ' + err);
            } else {
                db.collection(name).insert(record, function (err, res) {
                    cb(err, res);
                    db.close();
                });
            }
        });
    },
    remove: function (cb) {
        var name = this.colName;
        mongoClient.connect(this.url, function (err, db) {
            if (err) {
                console.log('ERROR ' + err);
            } else {
                db.collection(name).deleteMany({}, function (err, results) {
                    cb(err, results);
                    db.close();
                });
            }
        });
    },
    set: function (field, value) {
        var optionObj = {};
        optionObj[field] = value;
        this.setObj = {
            $set: optionObj
        };
        return this;
    },
    update: function (cb) {
        console.log(this);
        var name = this.colName;
        var limit = this.obj;
        var set = this.setObj;
        mongoClient.connect(this.url, function (err, db) {
            if (err) {
                console.log('ERROR ' + err);
            } else {
                db.collection(name).updateMany(limit, set, function (err, results) {
                    cb(err, results);
                    db.close();
                });
            }
        });
    }
};

function getObj(field, value, type, isNot) {
    value = isNot ? getNotValue(type, value) : getValue(type, value);
    var obj = {};
    obj[field] = value;
    return obj;
}

function getValue(type, value) {
    switch (type) {
        case 'equal':
            return value;
        case 'less':
            return {
                $lt: value
            };
        case 'greate':
            return {
                $gt: value
            };
        case 'include':
            return {
                $in: value
            };
    }
}

function getNotValue(type, value) {
    switch (type) {
        case 'equal':
            return {
                $ne: value
            };
        case 'less':
            return {
                $gte: value
            };
        case 'greate':
            return {
                $lte: value
            };
        case 'include':
            return {
                $nin: value
            };
    }
}

module.exports = multivarka;
