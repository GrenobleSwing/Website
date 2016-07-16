function LoginRouterConfig($stateProvider) {
  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "partials/login.html"
    });
}
