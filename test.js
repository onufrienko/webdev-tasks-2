'use strict';

const multivarka = require('./multivarka.js');
const localhost = 'mongodb://localhost:27017/test';

multivarka.server(localhost)
        .collection('students')
        .where('group')
        .equal('ПИ-301')
        .set('group', 'ПИ-302')
        .update(function (err, res) {
            console.log(res);
        });

multivarka.server(localhost)
        .collection('removeMe')
        .remove(function (err, res) {});

var sasha = {
    name: 'Илья',
    group: 'МТ-301',
    grade: 3
};

multivarka.server(localhost)
        .collection('students')
        .insert(sasha, function (err, res) {
            console.log(res);
        });

multivarka.server(localhost)
        .collection('students')
        .where('group')
        .equal('ПИ-301')
        .find(function (err, data) {
            console.log(data);
        });

multivarka.server(localhost)
        .collection('students')
        .where('grade')
        .lessThan(5)
        .find(function (err, data) {
            console.log(data);
        });

multivarka.server(localhost)
        .collection('students')
        .where('grade')
        .not()
        .greateThan(5)
        .find(function (err, data) {
            console.log(data);
        });

multivarka.server(localhost)
        .collection('students')
        .where('group')
        .include(['ПИ-301', 'КБ-301'])
        .find(function (err, data) {
            console.log(data);
        });
