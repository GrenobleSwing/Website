function SummaryRouterConfig($stateProvider) {
  $stateProvider
    .state('member.summary', {
      parent: 'member',
      url: "/summary",
      data: {
        roles: ['USER']
      },
      views: {
        'content@': {
          template: "<div class=\"row\"><gs-subscriptions-summary></gs-subscriptions-summary></div>"
        }
      }
    });
}
