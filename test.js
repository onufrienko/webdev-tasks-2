'use strict';

const multivarka = require('./multivarka.js');
const localhost = 'mongodb://localhost:27017/test';

multivarka
    .server(localhost)
    .collection('students')
    .where('group')
    .equal('КБ-201')
    .where('grade')
    .lessThan(5)
    .find((data) => {
        console.log(data);
    });

multivarka.server(localhost)
    .collection('students')
    .where('group')
    .equal('КБ-101')
    .set('group', 'КБ-102')
    .set('grade', 4)
    .update((data) => {
        console.log(data);
    });

multivarka
    .server(localhost)
    .collection('removeMe')
    .remove((data) => {});

var student = {
    name: 'Катя',
    group: 'ПИ-301',
    grade: 5
};

multivarka
    .server(localhost)
    .collection('students')
    .insert(student, (data) => {
        console.log(data);
    });

multivarka
    .server(localhost)
    .collection('students')
    .where('group')
    .equal('ПИ-302')
    .find((data) => {
        console.log(data);
    });

multivarka
    .server(localhost)
    .collection('students')
    .where('grade')
    .lessThan(5)
    .find((data) => {
        console.log(data);
    });

multivarka
    .server(localhost)
    .collection('students')
    .where('grade')
    .not()
    .greateThan(5)
    .find((data) => {
        console.log(data);
    });

multivarka
    .server(localhost)
    .collection('students')
    .where('group')
    .include(['ПИ-302', 'КБ-301'])
    .find((data) => {
        console.log(data);
    });
