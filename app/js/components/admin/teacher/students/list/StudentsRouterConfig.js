function StudentsRouterConfig($stateProvider) {
  $stateProvider
    .state('admin.students', {
      parent: 'admin',
      url: "/students",
      data: {
        roles: ['TEACHER']
      },
      views: {
        'content@': {
          template: "<div class=\"row\"><gs-students-list></gs-students-list></div>"
        }
      }
    });
}
