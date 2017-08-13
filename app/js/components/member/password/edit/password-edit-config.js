angular.module('app.password.edit', ['app.config', 'ui.router', 'ngMessages', 'app.password.common'])
  .config(['$stateProvider', PasswordRouterConfig])
  .controller('passwordEditController', ['passwordService', 'userDetails', PasswordEditController]);
