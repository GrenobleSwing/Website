angular.module('app.password.common', ['app.config', 'app.users'])
  .service('passwordResource', ['$http', 'config', PasswordResource])
  .service('passwordService', ['passwordResource', PasswordService]);
