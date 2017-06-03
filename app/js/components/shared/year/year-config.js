angular.module('app.year', ['app.config'])
    .service('yearFormResource', ['$http', 'config', YearFormResource])
    .service('yearService', ['$http', 'config', YearService]);
