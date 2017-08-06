function PasswordRouterConfig($stateProvider) {
  $stateProvider.state('member.password', {
      parent: 'member',
      url: "/password",
      views: {
        'content@': {
          templateUrl: 'components/member/password/password.edit.html',
          controller: "passwordEditController",
          controllerAs: "ctrl"
        }
      }
    });
}
