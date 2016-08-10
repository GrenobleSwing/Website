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
          template: "<gs-subscriptions-list></gs-subscriptions-list>",
          controller: function(){
            console.info("SubscriptionsRouterConfig");
          }
        }
      }
    });
}
