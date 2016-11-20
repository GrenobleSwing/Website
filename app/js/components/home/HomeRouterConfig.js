function HomeRouterConfig($stateProvider) {
  $stateProvider
    .state('index.home', {
      parent: 'index',
      url: '/home',
      data: {
        roles: []
      },
      views: {
        'nav@': {
          template: ''
        },
        'content@': {
          templateUrl: "components/home/home.html",
          controller: "homeController",
          controllerAs: "ctrl"
        }
      }
  });
}
