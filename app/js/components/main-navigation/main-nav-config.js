angular.module('app.main.nav', ['app.users'])
  .directive('gsMainNav', MainNavDirective)
  .controller('mainNavController', ['identityService', MainNavController]);
