angular.module('app.acl', ['app.users'])
    .service('authorizationService', ['$rootScope', '$state', 'identityService', AuthorizationService]);
