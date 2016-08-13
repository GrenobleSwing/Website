function MainNavRouterConfig($stateProvider) {
  $stateProvider
    .state('main.nav', {
      templateUrl: 'js/components/main-navigation/navbar.html',
      controller: 'mainNavController',
      controllerAs: 'ctrl'
  });
}
