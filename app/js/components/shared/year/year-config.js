angular.module('app.year', ['app.config'])
    .service('yearResource', ['$http', 'config', YearResource])
    .service('yearService', ['$cookies', '$q', 'yearResource', YearService]);
