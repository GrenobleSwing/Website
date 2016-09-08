angular.module('app.topic.common', ['app.config'])
    // .service('topicResource', ['$filter', '$q', '$resource', FakeTopicResource])
    .service('topicResource', ['$resource', 'config', TopicResource])
    .service('topicService', ['topicResource', TopicService]);
