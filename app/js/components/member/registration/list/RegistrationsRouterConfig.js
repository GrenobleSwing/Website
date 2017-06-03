function RegistrationsRouterConfig($stateProvider) {
  $stateProvider
    .state('member.registrations', {
      parent: 'member',
      url: "/registrations",
      views: {
        'content@': {
          templateUrl: "components/member/registrations/list/registrations.list.html",
          resolve: {
            userDetails : ['authenticationService', function(authService) {
              return authService.getCurrentAccount().then(function(response) {
                return response.data;
              });
            }],
            year : ['yearService', function(yearService) {
              return yearService.getCurrentYear().then(function(response) {
                return response.data;
              });
            }]
          }
        }
      }
    });
}
