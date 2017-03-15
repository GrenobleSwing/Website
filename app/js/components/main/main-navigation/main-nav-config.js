angular.module('app.main.nav', ['app.users', 'app.auth', 'ui.router'])
  .directive('gsMainNav', MainNavDirective)
  .controller('mainNavController', ['$scope', '$state', 'authenticationService', 'identityService', MainNavController]);
