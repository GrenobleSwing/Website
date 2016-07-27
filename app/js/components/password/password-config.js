angular.module('app.password', ['app.users', 'ngResource', 'ui.router'])
  // .directive('gsPasswordEdit', PasswordEditDirective)
  .config(['$stateProvider', PasswordRouterConfig])
  .service('passwordResource', ['$http', PasswordResource])
  .service('passwordService', ['passwordResource', PasswordService])
  .controller('passwordEditController', ['passwordService', PasswordEditController]);
