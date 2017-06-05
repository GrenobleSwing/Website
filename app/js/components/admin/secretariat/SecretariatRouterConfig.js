function SecretariatRouterConfig($stateProvider) {
  $stateProvider.state('admin.secretariat', {
      parent: 'admin',
      url: "/secretariat",
      data: {
        // roles: ['SECRETARY'],
        permissions: {
          only: ['ROLE_SECRETARY']
        }
      },
      views: {
        'content@': {
          templateUrl: 'components/secretariat/members.view.html',
          controller: 'membersListController',
          controllerAs: 'ctrl'
        }
      }
    });
}