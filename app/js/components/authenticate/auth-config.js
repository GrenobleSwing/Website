angular
    .module('app.auth', ['app.users'])
    .service('encoder', Base64)
    .service('authenticationService', ['$http', '$cookies', '$rootScope', 'encoder',
      'usersResource', FakeAuthenticationService]);
