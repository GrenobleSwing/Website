function PasswordRouterConfig($stateProvider) {
  $stateProvider
    .state('password', {
      parent: 'app',
      url: "/password",
      data: {
        roles: ['USER']
      },
      views: {
        content: {
          templateUrl: 'js/components/password/password.edit.html',
          controller: "passwordEditController",
          controllerAs: "ctrl"
        }
      }
    });
}
