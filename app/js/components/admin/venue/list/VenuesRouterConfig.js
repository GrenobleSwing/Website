function VenueRouterConfig($stateProvider) {
  $stateProvider.state('admin.activity', {
      parent: 'admin',
      url: "/activity",
      views: {
        'content@': {
          templateUrl: "components/admin/activity/list/activity.list.html",
          controller: "activitiesController",
          controllerAs: "ctrl",
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
