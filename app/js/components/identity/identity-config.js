angular.module('app.identity', ['app.auth', 'app.config'])
    .service('identityResource', ['$http', 'config', IdentityResource])
    .service('identityService', ['$cookieStore', '$q', 'identityResource', 'authResource', '$timeout', IdentityService]);
