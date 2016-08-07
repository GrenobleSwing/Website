angular.module('app.password', ['app.users', 'ngResource', 'ui.router'])
  .config(['$stateProvider', PasswordRouterConfig])
  .service('passwordResource', ['$http', PasswordResource])
  .service('passwordService', ['passwordResource', PasswordService])
  .controller('passwordEditController', ['passwordService', PasswordEditController]);
