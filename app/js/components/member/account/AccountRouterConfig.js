function AccountRouterConfig($stateProvider) {
  $stateProvider.state('member.account', {
      parent: 'member',
      url: "/account",
      views: {
        'content@': {
          template: '<section ng-bind-html="ctrl.content"></section>',
          controller: "accountController",
          controllerAs: "ctrl",
          resolve: {
            userDetails : ['authenticationService', function(authService) {
              return authService.getCurrentAccount().then(function(response) {
                return response.data;
              });
            }]
          }
        }
      }
    });
}
