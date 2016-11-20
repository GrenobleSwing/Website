function AdminNavRouterConfig($stateProvider) {
  $stateProvider
    .state('admin.nav', {
      templateUrl: 'components/admin-navigation/navbar.html',
      controller: 'adminNavController',
      controllerAs: 'ctrl'
  });
}
