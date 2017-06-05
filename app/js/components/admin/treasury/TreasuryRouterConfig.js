function TreasuryRouterConfig($stateProvider) {
  $stateProvider.state('admin.treasury', {
      parent: 'admin',
      url: "/treasury",
      data: {
        // roles: ['TREASURER'],
        permissions: {
          only: ['ROLE_TREASURER']
        }
      },
      views: {
        'content@': {
          template: '<p>Treasury Page</p>'
        }
      }
    });
}