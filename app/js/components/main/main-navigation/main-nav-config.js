angular.module('app.main.nav', ['app.acl', 'app.auth', 'ui.router'])
  .directive('gsMainNav', MainNavDirective)
  .controller('mainNavController', ['$scope', '$state', 'authenticationService', 'aclService', MainNavController]);
