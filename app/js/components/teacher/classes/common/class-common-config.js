angular.module('app.classes.common', ['app.config', 'app.year'])
    .service('classResource', ['$resource', 'config', ClassResource])
    .service('classService', ['$q', 'classResource', 'yearService', ClassService]);
