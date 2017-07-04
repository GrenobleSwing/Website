angular.module('app.activity.actions.add-topic', ['ui.bootstrap'])
    .controller('activityAddTopicController', ['$scope', '$uibModal', ActivityAddTopicController])
    .directive('gsActivityAddTopic', ActivityAddTopicDirective);
