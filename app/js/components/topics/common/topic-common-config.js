angular.module('app.topic.common', [])
    // .service('topicObservableService', topicObservableService)
    .service('topicResource', ['$timeout', '$filter', '$q', '$resource', FakeTopicResource])
    .service('topicService', ['$q', 'topicResource', TopicService]);
