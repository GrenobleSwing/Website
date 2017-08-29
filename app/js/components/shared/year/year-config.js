angular.module('app.year', ['app.config'])
    .service('yearService', ['$http', 'config', YearService]);
