function LoginRouterConfig($stateProvider) {
  $stateProvider
    .state('login', {
      url: "/login",
      views: {
        content: {
          templateUrl: 'partials/login.html',
          controller: "loginController",
          controllerAs: "ctrl"
        }
      }
    });
}
