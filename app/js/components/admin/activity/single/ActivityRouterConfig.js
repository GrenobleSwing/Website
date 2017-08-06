function ActivityRouterConfig($stateProvider) {
  $stateProvider.state('admin.activity', {
      parent: 'admin',
      url: "/activity/{id}",
      views: {
        'content@': {
          templateUrl: "components/admin/activity/single/activity.list.html",
          controller: "activityController",
          controllerAs: "ctrl",
          resolve: {
            userDetails : ['authenticationService', function(authService) {
              return authService.getCurrentAccount().then(function(response) {
                return response.data;
              });
            }],
            activityDetails : ['$http', 'config', '$stateParams', function($http, config, $stateParams) {
              return this.http.get(this.config.apiUrl + '/activity/'+$stateParams.id).then(function(response) {
                return response.data;
              });
            }]
          }
        }
      }
    });
}
