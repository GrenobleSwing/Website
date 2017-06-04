angular.module('app.topic', ['app.config'])
    .service('topicFormResource', ['$http', 'config', TopicFormResource]);
