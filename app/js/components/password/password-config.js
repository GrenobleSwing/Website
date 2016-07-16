angular.module('app.password', [])
  .directive('gsPasswordEdit', PasswordEditDirective)
  .service('passwordResource', ['$http', PasswordResource])
  .service('passwordService', ['passwordResource', PasswordService])
  .controller('passwordEditController', ['passwordService', PasswordEditController]);
