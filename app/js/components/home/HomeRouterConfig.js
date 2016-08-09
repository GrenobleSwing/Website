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
          templateUrl: "js/components/home/home.html",
          controller: "homeController",
          controllerAs: "ctrl"
        }
      }
  });
}
