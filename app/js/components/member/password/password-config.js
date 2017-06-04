angular.module('app.password', ['app.config', 'ui.router', 'ngMessages'])
  .config(['$stateProvider', PasswordRouterConfig])
  .service('passwordResource', ['$http', 'config', PasswordResource])
  .service('passwordService', ['passwordResource', PasswordService])
  .controller('passwordEditController', ['passwordService', PasswordEditController]);
