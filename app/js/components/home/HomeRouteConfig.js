function HomeRouteConfig($routeProvider) {
  $routeProvider
        .when('/home', {
            controller: 'homeController',
            templateUrl: 'partials/home.html',
            controllerAs: 'ctrl'
          });
}
