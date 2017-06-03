angular.module('app.auth', ['app.config'])
    .service('authResource', ['$http', 'config', AuthResource])
    .service('authenticationService', ['$rootScope', '$cookies', '$http', 'config', AuthenticationService]);
