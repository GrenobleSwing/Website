function PasswordRouterConfig($stateProvider) {
  $stateProvider.state('member.password', {
      parent: 'member',
      url: "/password",
      data: {
        roles: ['USER']
      },
      views: {
        'content@': {
          templateUrl: 'components/password/password.edit.html',
          controller: "passwordEditController",
          controllerAs: "ctrl"
        }
      }
    });
}
