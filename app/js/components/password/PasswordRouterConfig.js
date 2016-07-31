function PasswordRouterConfig($stateProvider) {
  $stateProvider
    .state('app.password', {
      url: "/password",
      views: {
        nav: {
          templateUrl: 'partials/navbar.html',
          controller: "navController",
          controllerAs: "ctrl"
        },
        content: {
          templateUrl: 'partials/password.edit.html',
          controller: "passwordEditController",
          controllerAs: "ctrl"
        }
      }
    });
}
