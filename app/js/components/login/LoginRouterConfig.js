function LoginRouterConfig($stateProvider) {
  $stateProvider
    .state('login', {
      url: "/login",
      views: {
        content: {
          templateUrl: 'js/components/login/login.html',
          controller: "loginController",
          controllerAs: "ctrl"
        }
      },
      data: {
        roles: []
      },
    });
}
