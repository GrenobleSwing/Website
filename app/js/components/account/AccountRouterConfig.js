function AccountRouterConfig($stateProvider) {
  $stateProvider
    .state('account', {
      url: "/account",
      templateUrl: "partials/account.edit.html"
    });
}
