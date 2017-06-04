angular.module('app.password.common', ['app.config'])
  .service('passwordResource', ['$http', 'config', PasswordResource])
  .service('passwordService', ['passwordResource', PasswordService]);
