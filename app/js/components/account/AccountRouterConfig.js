function AccountRouterConfig($stateProvider) {
  $stateProvider.state('member.account', {
      parent: 'member',
      url: "/account",
      views: {
        'content@': {
          templateUrl: 'components/account/account.edit.html',
          controller: "accountEditController",
          controllerAs: "ctrl"
        }
      }
    });
}
