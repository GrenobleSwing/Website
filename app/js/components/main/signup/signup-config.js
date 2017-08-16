angular.module('app.signup', ['app.config', 'ui.router', 'ngSanitize'])
  .config(['$stateProvider', SignUpRouterConfig])
  .controller('signUpController', ['$http', 'config', '$scope', '$sce', 'content', '$compile', '$state', SignUpController]);
