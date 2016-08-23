angular.module('app.password', ['app.users', 'ui.router', 'ngMessages'])
  .config(['$stateProvider', PasswordRouterConfig])
  .service('passwordResource', ['$http', PasswordResource])
  .service('passwordService', ['passwordResource', PasswordService])
  .controller('passwordEditController', ['passwordService', PasswordEditController]);
