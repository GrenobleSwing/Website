angular.module('app.nav', ['ui.router'])
  .directive('gsNav', NavDirective)
  .controller('navController', ['$state', NavController]);
