angular.module('app.topic.list', ['ui.router', 'ui.bootstrap', 'app.topic.common'])
  .config(['$stateProvider', TopicRouterConfig])
  .service('topicResource', ['$resource', FakeTopicResource])
  .service('topicService', ['topicResource', TopicsService])
  .controller('topicsListController', ['$uibModal', 'topicService', TopicsListController]);
