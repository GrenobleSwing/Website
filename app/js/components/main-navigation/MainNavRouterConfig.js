function MainNavRouterConfig($stateProvider) {
  $stateProvider
    .state('main.nav', {
      templateUrl: 'components/main-navigation/navbar.html',
      controller: 'mainNavController',
      controllerAs: 'ctrl'
  });
}
