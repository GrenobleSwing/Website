function AdminNavRouterConfig($stateProvider) {
  $stateProvider
    .state('admin.nav', {
      templateUrl: 'components/admin/admin-navigation/navbar.html',
      controller: 'adminNavController',
      controllerAs: 'ctrl'
  });
}
