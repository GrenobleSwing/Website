function HomeRouterConfig($stateProvider) {
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "partials/home.html",
      controller: "homeController",
      controllerAs: "ctrl"
    });
}
