angular.module('app.signup', ['app.users'])
  .config(['$stateProvider', SignUpRouterConfig])
  .controller('signUpController', ['$location', 'userService', SignUpController]);
