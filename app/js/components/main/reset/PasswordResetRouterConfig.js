function PasswordResetRouterConfig($stateProvider) {
  $stateProvider.state('index.reset', {
      url: "/reset",
      data: {
        roles: []
      },
      views: {
        'content@': {
          templateUrl: 'components/main/reset/password.reset.html',
          controller: "passwordResetController",
          controllerAs: "ctrl"
        }
      },
      resolve: {
        content : ['$http', 'config', function($http, config) {
          return $http.get(config.apiUrl + '/resetting/request').then(function(response) {
            return response.data;
          });
        }]
      }
    });
}
