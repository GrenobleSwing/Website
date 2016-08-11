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
          template: "<div class=\"row\"><gs-subscriptions-list></gs-subscriptions-list></div><div class=\"row\"><gs-subscriptions-summary></gs-subscriptions-summary></div>"
        }
      }
    });
}
