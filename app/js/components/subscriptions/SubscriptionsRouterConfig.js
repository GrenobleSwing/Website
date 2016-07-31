function SubscriptionsRouterConfig($stateProvider) {
  $stateProvider
    .state('subscriptions', {
      parent: 'app',
      url: "/subscriptions",
      views: {
        content: {
          templateUrl: "partials/subscriptions.view.html",
          controller: "subscriptionsViewController",
          controllerAs: "ctrl"
        }
      },
      data: {
        roles: ['USER']
      }
    });
}
