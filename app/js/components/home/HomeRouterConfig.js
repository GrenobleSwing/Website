function HomeRouterConfig($stateProvider) {
  $stateProvider
    .state('index.home', {
      parent: 'index',
      url: "/home",
      data: {
        roles: ['USER']
      },
      views: {
        'nav@': {
          template: ''
        },
        'content@': {
          templateUrl: "js/components/home/home.html",
          controller: "homeController",
          controllerAs: "ctrl"
        }
      }
  });
}
