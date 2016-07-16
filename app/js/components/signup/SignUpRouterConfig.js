function SignUpRouterConfig($stateProvider) {
  $stateProvider
    .state('sign-up', {
      url: "/sign-up",
      templateUrl: "partials/signup.html"
    });
}
