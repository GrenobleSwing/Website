function SignUpRouterConfig($stateProvider) {
  $stateProvider
    .state('sign-up', {
      url: "/sign-up",
      views: {
        content: {
          templateUrl: "partials/signup.html",
          controller: "signUpController",
          controllerAs: "ctrl"
        }
      }
    });
}
