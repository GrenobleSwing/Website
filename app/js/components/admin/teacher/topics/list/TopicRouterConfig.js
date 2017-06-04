function TopicRouterConfig($stateProvider) {
  $stateProvider.state('admin.topics', {
      parent: 'admin',
      url: "/topics",
      data: {
        // roles: ['TOPIC_MANAGER'],
        permissions: {
          only: ['ROLE_TOPIC_MANAGER']
        }
      },
      views: {
        'content@': {
          templateUrl: 'components/teacher/topics/list/topics.view.html',
          controller: 'topicsListController',
          controllerAs: 'ctrl'
        }
      }
    });
}
