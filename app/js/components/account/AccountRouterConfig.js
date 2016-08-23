function AccountRouterConfig($stateProvider) {
  $stateProvider.state('member.account', {
      parent: 'member',
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
