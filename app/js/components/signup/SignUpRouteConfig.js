function SignUpRouteConfig($routeProvider) {
  $routeProvider.when('/sign-up', {
          controller: 'signUpController',
          templateUrl: 'partials/signup.html',
          controllerAs: 'ctrl'
      });
}
