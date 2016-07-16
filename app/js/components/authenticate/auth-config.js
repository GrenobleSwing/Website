angular
    .module('app.auth', ['app.users', 'sdt.models'])
    .service('encoder', Base64)
    .service('authenticationService', ['$http', '$cookieStore', '$rootScope', 'encoder', 
      'currentUserService', FakeAuthenticationService]);
