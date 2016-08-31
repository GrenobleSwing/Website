function TopicRouterConfig($stateProvider) {
  $stateProvider.state('admin.topics', {
      parent: 'admin',
      url: "/topics",
      data: {
        roles: ['TOPIC_MANAGER']
      },
      views: {
        'content@': {
          templateUrl: 'js/components/topics/list/topics.view.html',
          controller: 'topicsListController',
          controllerAs: 'ctrl'
        }
      }
    });
}
