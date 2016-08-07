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
          templateUrl: "components/home/home.html",
          controller: "homeController",
          controllerAs: "ctrl"
        }
      }
  });
}
