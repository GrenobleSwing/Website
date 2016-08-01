function HomeRouterConfig($stateProvider) {
  $stateProvider
    .state('home', {
      parent: 'app',
      url: "/",
      data: {
        roles: ['USER']
      },
      views: {
        'content@': {
          templateUrl: "partials/home.html",
          controller: "homeController",
          controllerAs: "ctrl"
        }
      }
  });
}
