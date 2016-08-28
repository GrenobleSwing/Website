function SecretariatRouterConfig($stateProvider) {
  $stateProvider.state('admin.secretariat', {
      parent: 'admin',
      url: "/secretariat",
      data: {
        roles: ['SECRETARY']
      },
      views: {
        'content@': {
          templateUrl: 'js/components/secretariat/members.view.html',
          controller: 'membersListController',
          controllerAs: 'ctrl'
        }
      }
    });
}
