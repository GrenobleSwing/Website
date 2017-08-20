angular.module('app.main.nav', ['app.auth', 'ui.router'])
  .directive('gsMainNav', MainNavDirective)
  .controller('mainNavController', ['$state', 'authenticationService', 'config', '$http', '$rootScope', '$cookies', MainNavController]);
