angular
    .module('app.auth', ['app.users'])
    .service('encoder', Base64)
    .service('authenticationService', ['$http', '$cookieStore', '$rootScope', 'encoder',
      'usersResource', 'sessionService', 'authorizeService', FakeAuthenticationService]);
