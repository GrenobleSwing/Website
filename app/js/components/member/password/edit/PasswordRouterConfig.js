function PasswordRouterConfig($stateProvider) {
  $stateProvider.state('member.password', {
      url: "/password",
      data: {
        roles: ['USER']
      },
      views: {
        'content@': {
          templateUrl: 'components/member/password/edit/password.edit.html',
          controller: "passwordEditController",
          controllerAs: "ctrl"
        }
      },
      resolve: {
        userDetails : ['authenticationService', function(authService) {
          return authService.getCurrentAccount().then(function(response) {
            return response.data;
          });
        }],
        content : ['$http', 'config', function($http, config) {
          return $http.get(config.apiUrl + '/user/change-password').then(function(response) {
            return response.data;
          });
        }]
      }
    });
}
