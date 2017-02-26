function LoginRouterConfig($stateProvider) {
  $stateProvider
    .state('index.login', {
      parent: 'index',
      url: '',
      views: {
        'content@': {
          templateUrl: 'components/login/login.html',
          controller: "loginController",
          controllerAs: "ctrl"
        }
      }
    });
}
