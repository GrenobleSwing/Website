angular.module('app.topic.list', ['ui.router', 'ui.bootstrap', 'app.topic.common'])
  .config(['$stateProvider', TopicRouterConfig])
  .controller('topicsListController', ['$uibModal', 'topicService', TopicsListController]);
