angular.module('app.topic.edit', ['ui.router', 'ui.bootstrap', 'app.topic.common'])
  .controller('topicEditController', ['$uibModal', 'topicService', TopicEditController]);
