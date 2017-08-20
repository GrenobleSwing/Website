function AccountRouterConfig($stateProvider) {
  $stateProvider
    .state('member.account', {
      url: '/account',
      views: {
        'content@': {
          templateUrl: "components/member/account/account.html",
          controller: "accountController"
        }
      },
      resolve: {
        userDetails : ['authenticationService', function(authService) {
          return authService.getCurrentAccount().then(function(response) {
            return response.data;
          });
        }]
      }
    });
}
