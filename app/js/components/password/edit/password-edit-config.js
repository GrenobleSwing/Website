angular.module('app.password.edit', ['app.config', 'app.users', 'ui.router', 'ngMessages', 'app.password.common'])
  .config(['$stateProvider', PasswordRouterConfig])
  .service('passwordResource', ['$http', 'config', PasswordResource])
  .service('passwordService', ['passwordResource', PasswordService])
  .controller('passwordEditController', ['passwordService', PasswordEditController]);
