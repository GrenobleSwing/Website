function SubscriptionsRouterConfig($stateProvider) {
  $stateProvider
    .state('member.subscriptions', {
      parent: 'member',
      url: "/subscriptions",
      data: {
        roles: ['USER']
      },
      views: {
        'content@': {
          template: "<div class=\"row\"><gs-subscriptions-list></gs-subscriptions-list></div>"
        }
      }
    });
}
