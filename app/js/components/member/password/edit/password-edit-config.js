angular.module('app.password.edit', ['app.config', 'ui.router', 'ngSanitize'])
  .config(['$stateProvider', PasswordRouterConfig])
  .controller('passwordEditController', ['$http', 'config', '$scope', '$sce', 'content', '$compile', 'userDetails', PasswordEditController]);
