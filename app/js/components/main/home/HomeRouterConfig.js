function HomeRouterConfig($stateProvider) {
  $stateProvider
    .state('member.home', {
      url: '/home',
      views: {
        'content@': {
          templateUrl: "components/main/home/home.html",
          controller: "homeController",
          controllerAs: "ctrl"
        },
        'header@' : {
          template : '<gs-main-nav></gs-main-nav>'
        }
      }
  });
}
