function SubscriptionsRouterConfig($stateProvider) {
  $stateProvider
    .state('subscriptions', {
      url: "/subscriptions",
      templateUrl: "partials/subscriptions.view.html"
    });
}
