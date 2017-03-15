angular.module('app.auth', ['app.config'])
    .service('authResource', ['$http', 'config', AuthResource])
    .service('tokenResource', ['$http', 'config', TokenResource])
    .service('tokenService', ['$q', 'tokenResource', TokenService])
    .service('authenticationService', ['$rootScope', '$cookies', '$http', 'authResource', AuthenticationService]);
