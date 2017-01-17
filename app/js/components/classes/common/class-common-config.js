angular.module('app.classes.common', ['app.config'])
    .service('classResource', ['$resource', 'config', ClassResource])
    .service('classService', ['$q', 'classResource', ClassService]);
