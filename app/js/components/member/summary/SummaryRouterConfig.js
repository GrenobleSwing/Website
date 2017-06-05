function SummaryRouterConfig($stateProvider) {
  $stateProvider
    .state('member.summary', {
      parent: 'member',
      url: "/summary",
      data: {
        roles: ['USER']
      },
      views: {
        'content@': {
          templateUrl: 'components/member/summary/summary.html',
          controller: 'summaryController',
          controllerAs: 'ctrl',
          resolve: {
            userDetails : ['authenticationService', function(authService) {
              return authService.getCurrentAccount().then(function(response) {
                return response.data;
              });
            }]
          }
        }
      }
    });
}
