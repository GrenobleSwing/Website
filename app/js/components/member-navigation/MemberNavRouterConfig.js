function MemberNavRouterConfig($stateProvider) {
  $stateProvider
    .state('member.nav', {
      templateUrl: 'js/components/member-navigation/navbar.html',
      controller: 'memberNavController',
      controllerAs: 'ctrl'
  });
}
