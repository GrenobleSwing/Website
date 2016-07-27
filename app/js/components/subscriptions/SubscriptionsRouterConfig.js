function SubscriptionsRouterConfig($stateProvider) {
  $stateProvider
    .state('subscriptions', {
      url: "/subscriptions",
      views: {
        nav: {
          templateUrl: 'partials/navbar.html',
          controller: "navController",
          controllerAs: "ctrl"
        },
        content: {
          templateUrl: "partials/subscriptions.view.html",
          controller: "subscriptionsViewController",
          controllerAs: "ctrl"
        },
        graph: {
          templateUrl: "partials/subscriptions.summary.html",
          controller: function($scope) {

          }
        }
      }

    });
}
