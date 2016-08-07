angular.module('app.signup', ['app.users', 'ui.router'])
  .config(['$stateProvider', SignUpRouterConfig])
  .controller('signUpController', ['$state', 'userService', SignUpController]);
