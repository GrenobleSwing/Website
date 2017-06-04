angular.module('app.signup', ['app.config', 'ui.router'])
  .config(['$stateProvider', SignUpRouterConfig])
  .controller('signUpController', ['$state', '$http', 'config', SignUpController]);
