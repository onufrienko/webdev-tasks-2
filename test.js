'use strict';

const multivarka = require('./multivarka.js');
const localhost = 'mongodb://localhost:27017/test';

multivarka.server(localhost)
        .collection('students')
        .where('group')
        .equal('МТ-302')
        .set('group', 'МТ-301')
        .update(function (res) {
            console.log(res);
        });

multivarka.server(localhost)
        .collection('removeMe')
        .remove(function (res) {});

var mary = {
    name: 'Мария',
    group: 'ФТ-101',
    grade: 4
};

multivarka.server(localhost)
        .collection('students')
        .insert(mary, function (res) {
            console.log(res);
        });

multivarka.server(localhost)
        .collection('students')
        .where('group')
        .equal('ПИ-302')
        .find(function (data) {
            console.log(data);
        });

multivarka.server(localhost)
        .collection('students')
        .where('grade')
        .lessThan(5)
        .find(function (data) {
            console.log(data);
        });

multivarka.server(localhost)
        .collection('students')
        .where('grade')
        .not()
        .greateThan(5)
        .find(function (data) {
            console.log(data);
        });

multivarka.server(localhost)
        .collection('students')
        .where('group')
        .include(['ПИ-302', 'КБ-301'])
        .find(function (data) {
            console.log(data);
        });
