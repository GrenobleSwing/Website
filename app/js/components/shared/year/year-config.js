angular.module('app.year', ['app.config'])
    .service('yearFormResource', ['$http', 'config', YearFormResource])
    .service('yearResource', ['$http', 'config', YearResource])
    .service('yearService', ['$cookies', '$q', 'yearResource', YearService]);
