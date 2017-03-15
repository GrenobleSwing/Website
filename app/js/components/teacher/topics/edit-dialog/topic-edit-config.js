angular.module('app.topic.edit', ['ui.router', 'ui.bootstrap', 'app.topic.common'])
  .controller('topicEditController', ['$uibModalInstance', 'topicService', 'topic', TopicEditController]);
