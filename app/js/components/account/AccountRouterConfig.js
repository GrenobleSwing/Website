function AccountRouterConfig($stateProvider) {
  $stateProvider
    .state('account', {
      parent: 'app',
      url: "/account",
      data: {
        roles: ['USER']
      },
      views: {
        'content@': {
          templateUrl: 'js/components/account/account.edit.html',
          controller: "accountEditController",
          controllerAs: "ctrl"
        }
      }
    });
}
