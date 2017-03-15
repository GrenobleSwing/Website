function ClassesRouterConfig($stateProvider) {
  $stateProvider
    .state('admin.classes', {
      parent: 'admin',
      url: "/classes",
      data: {
        roles: ['TEACHER']
      },
      views: {
        'content@': {
          template: "<div class=\"row\"><gs-classes-list></gs-classes-list></div>"
        }
      }
    });
}
