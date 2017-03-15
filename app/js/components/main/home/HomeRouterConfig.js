function HomeRouterConfig($stateProvider) {
  $stateProvider
    .state('member.home', {
      parent: 'member',
      url: '',
      views: {
        'content@': {
          // templateUrl: "components/home/home.html",
          template : '<p>HOME</p>',
          controller: "homeController",
          controllerAs: "ctrl"
        }
      }
  });
}
