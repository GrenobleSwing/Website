function LoginRouterConfig($stateProvider) {
  $stateProvider
    .state('index.login', {
      url: '/login',
      views: {
        'content@': {
          templateUrl: 'components/main/login/login.html',
          controller: "loginController",
          controllerAs: "ctrl"
        }
      },
      data: {
        permissions: {
          only: ['ANONYMOUS']
        }
      }
    });
}
