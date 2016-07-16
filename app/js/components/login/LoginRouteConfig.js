function LoginRouteConfig($routeProvider) {
  $routeProvider
        .when('/login', {
            controller: 'loginController',
            templateUrl: 'partials/login.html',
            controllerAs: 'ctrl'
      });
}
