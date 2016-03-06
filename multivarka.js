'use strict';

const mongoClient = require('mongodb').MongoClient;

module.exports = {
    server: function (url) {
        this.url = url;
        return this;
    },
    collection: function (name) {
        this.colName = name;
        this.limits = {};
        this.setObj = {};
        this.setObj.$set = {};
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
        this.limits[this.field] = getValue('equal', value, this.isNot);
        return this;
    },
    lessThan: function (value) {
        this.limits[this.field] = getValue('less', value, this.isNot);
        return this;
    },
    greateThan: function (value) {
        this.limits[this.field] = getValue('greate', value, this.isNot);
        return this;
    },
    include: function (value) {
        this.limits[this.field] = getValue('include', value, this.isNot);
        return this;
    },
    find: function (cb) {
        doRequest(this, cb, (db) => {
            return db.collection(this.colName).find(this.limits).toArray();
        });
    },
    insert: function (record, cb) {
        doRequest(this, cb, (db) => {
            return db.collection(this.colName).insert(record);
        });
    },
    remove: function (cb) {
        doRequest(this, cb, (db) => {
            return db.collection(this.colName).deleteMany({});
        });
    },
    set: function (field, value) {
        this.setObj.$set[field] = value;
        console.log(this.setObj);
        return this;
    },
    update: function (cb) {
        doRequest(this, cb, (db) => {
            return db.collection(this.colName).updateMany(this.limits, this.setObj);
        });
    }
};

function doRequest(params, cb, action) {
    var db;
    mongoClient.connect(params.url)
    .then((database) => {
        db = database;
        return action(db);
    })
    .then((results) => {
        cb(results);
        db.close();
    })
    .catch((err) => {
        console.error(err);
    });
}

function getValue(type, value, isNot) {
    switch (type) {
        case 'equal':
            return isNot ? { $ne: value} : value;
        case 'less':
            return isNot ? { $gte: value} : { $lt: value};
        case 'greate':
            return isNot ? { $lte: value} : { $gt: value};
        case 'include':
            return isNot ? { $nin: value} : { $in: value};
    }
}
