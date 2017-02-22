function AdminRouterConfig($stateProvider) {
  $stateProvider.state('admin.admin', {
      parent: 'admin',
      url: "/admin",
      // data: {
      //   roles: ['ADMIN']
      // },
      views: {
        'content@': {
          template: '<p>Admin Main Page</p>'
        }
      }
    });
}
