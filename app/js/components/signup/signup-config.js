angular.module('app.signup', ['app.users'])
  .config(['$routeProvider', SignUpRouteConfig])
  .controller('signUpController', ['$location', 'userService', SignUpController]);
