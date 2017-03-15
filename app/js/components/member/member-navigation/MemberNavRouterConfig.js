function MemberNavRouterConfig($stateProvider) {
  $stateProvider
    .state('member.nav', {
      templateUrl: 'components/member/member-navigation/navbar.html',
      controller: 'memberNavController',
      controllerAs: 'ctrl'
  });
}
