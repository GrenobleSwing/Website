function SubscriptionsRouterConfig($stateProvider) {
  $stateProvider
    .state('subscriptions', {
      parent: 'app',
      url: "/subscriptions",
      data: {
        roles: ['USER']
      },
      views: {
        'content@': {
          templateUrl: "components/subscriptions/subscriptions.view.html",
          controller: "subscriptionsViewController",
          controllerAs: "ctrl"
        }
      }
    });
}
