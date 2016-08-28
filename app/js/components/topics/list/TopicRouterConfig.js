function TopicRouterConfig($stateProvider) {
  $stateProvider.state('admin.topics', {
      parent: 'admin',
      url: "/topics",
      data: {
        roles: ['TOPIC_MANAGER']
      },
      views: {
        'content@': {
          // templateUrl: 'js/components/topics/members.view.html',
          template: '<p>Topics</p>'
          // controller: 'membersListController',
          // controllerAs: 'ctrl'
        }
      }
    });
}
