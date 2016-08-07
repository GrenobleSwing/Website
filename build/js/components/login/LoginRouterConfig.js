function LoginRouterConfig($stateProvider) {
  $stateProvider
    .state('login', {
      url: "/login",
      views: {
        content: {
          templateUrl: 'components/login/login.html',
          controller: "loginController",
          controllerAs: "ctrl"
        }
      },
      data: {
        roles: []
      },
    });
}
