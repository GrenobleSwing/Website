function PasswordRouterConfig($stateProvider) {
  $stateProvider
    .state('password', {
      parent: 'app',
      url: "/password",
      views: {
        content: {
          templateUrl: 'partials/password.edit.html',
          controller: "passwordEditController",
          controllerAs: "ctrl"
        }
      }
    });
}
