function TreasuryRouterConfig($stateProvider) {
  $stateProvider.state('admin.treasury', {
      parent: 'admin',
      url: "/treasury",
      data: {
        roles: ['TREASURER']
      },
      views: {
        'content@': {
          template: '<p>Treasury Page</p>'
        }
      }
    });
}
