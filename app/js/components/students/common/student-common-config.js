angular.module('app.students.common', ['app.config'])
    .service('studentResource', ['$resource', 'config', StudentResource])
    .service('studentService', ['$q', 'studentResource', StudentService]);
