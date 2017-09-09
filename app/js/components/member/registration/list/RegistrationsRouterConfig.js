function RegistrationsRouterConfig($stateProvider) {
  $stateProvider
    .state('member.registrations', {
      url: "/registrations",
      views: {
        'content@': {
          templateUrl: "components/member/registration/list/registrations.list.html",
          controller: "registrationsListController",
          controllerAs: "ctrl"
        }
      },
      resolve: {
        userDetails : ['authenticationService', function(authService) {
          return authService.getCurrentAccount().then(function(response) {
            return response.data;
          });
        }],
        year : ['yearService', function(yearService) {
          return yearService.getCurrentYear().then(function(response) {
            var data;
            if ( response.data !== undefined) {
              data = response.data;
              data.$ok = true;
            } else {
              data.$ok = false;
            }

            return data;
          }, function() {
            var data = {};
            data.$ok = false;
            return data;
          });
        }]
      }
    });
}
