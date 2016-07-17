function AccountRouterConfig($stateProvider) {
  $stateProvider
    .state('account', {
      url: "/account",
      views: {
        nav: {
          templateUrl: 'partials/navbar.html',
          controller: "navController",
          controllerAs: "ctrl"
        },
        content: {
          templateUrl: 'partials/account.edit.html',
          controller: "accountEditController",
          controllerAs: "ctrl"
        }
      }
    });
}
