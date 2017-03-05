function LoginRouterConfig($stateProvider) {
  $stateProvider
    .state('index.login', {
      url: '/login',
      views: {
        'content@': {
          templateUrl: 'components/login/login.html',
          controller: "loginController",
          controllerAs: "ctrl"
        }
      },
      data: {
          permissions: {
            except: ['AUTHORIZED'],
            redirectTo : 'member.account'
          }
      }
    });
}
