angular.module('app.auth', ['app.config', 'app.users'])
    // .service('authResource', ['$timeout', '$filter', '$q', '$resource', 'usersResource', TokenResourceStub])
    .service('authResource', ['$http', 'config', AuthResource])
    // .service('encoder', Base64)
    .service('authenticationService', ['$rootScope', '$cookies', '$http', 'authResource', AuthenticationService]);
