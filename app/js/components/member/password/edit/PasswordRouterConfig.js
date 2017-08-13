function PasswordRouterConfig($stateProvider) {
  $stateProvider.state('member.password', {
      parent: 'member',
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
        }]
      }
    });
}
