function AdminNavRouterConfig($stateProvider) {
  $stateProvider
    .state('admin.nav', {
      templateUrl: 'js/components/admin-navigation/navbar.html',
      controller: 'adminNavController',
      controllerAs: 'ctrl'
  });
}
