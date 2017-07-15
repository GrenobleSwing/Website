angular.module('app.signup', ['app.config', 'ui.router', 'ngSanitize'])
  .config(['$stateProvider', SignUpRouterConfig])
  .controller('signUpController', ['$sce', 'content', SignUpController]);
