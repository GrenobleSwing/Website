angular.module('app.auth', ['app.users'])
    .service('tokenResource', ['$timeout', '$filter', '$q', '$resource', 'usersResource', TokenResourceStub])
    .service('encoder', Base64)
    .service('authenticationService', ['$http', '$cookies', '$rootScope', 'encoder',
      'tokenResource', FakeAuthenticationService]);
