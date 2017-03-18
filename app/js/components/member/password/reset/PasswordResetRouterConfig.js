function PasswordResetRouterConfig($stateProvider) {
  $stateProvider.state('index.password.reset', {
      parent: 'index',
      url: "/reset/:token",
      data: {
        roles: []
      },
      views: {
        'content@': {
          templateUrl: 'components/member/password/reset/password.reset.html',
          controller: "passwordResetController",
          controllerAs: "ctrl"
        }
      }
    });
}