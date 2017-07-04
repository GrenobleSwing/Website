angular.module('app.activity.actions.edit-topic', ['ui.bootstrap'])
    .controller('activityEditTopicController', ['$scope', '$uibModal', ActivityEditTopicController])
    .directive('gsActivityEditTopic', ActivityEditTopicDirective);
