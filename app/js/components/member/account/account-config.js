angular.module('app.account', ['app.config', 'ui.router', 'ngSanitize'])
  .config(['$stateProvider', AccountRouterConfig])
  .controller('accountController', ['$http', 'config', 'userDetails', '$sce', '$scope', AccountController]);
