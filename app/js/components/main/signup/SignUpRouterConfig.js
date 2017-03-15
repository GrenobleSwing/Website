function SignUpRouterConfig($stateProvider) {
  $stateProvider
    .state('sign-up', {
      url: "/sign-up",
      views: {
        content: {
          templateUrl: "components/main/signup/signup.html",
          controller: "signUpController",
          controllerAs: "ctrl"
        }
      },
      data: {
        roles: []
      },
    });
}
